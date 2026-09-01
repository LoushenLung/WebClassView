/**
 * lib/cloudinary.ts — Cloudinary server-only integration
 *
 * This file MUST NEVER be imported in client-side (browser) code.
 * All Cloudinary operations (upload, delete, URL transform) are centralised here.
 * Validated at module load — fails fast if any required env var is missing.
 *
 * Req: 15.1–15.5 | Design §10
 */

// Side-effect import: validates Supabase + DATABASE_URL env vars early
import "./env";

import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

function ensureConfigured(): void {
  if (isConfigured) return;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const missing = [
    !cloudName && "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
    !apiKey    && "NEXT_PUBLIC_CLOUDINARY_API_KEY",
    !apiSecret && "CLOUDINARY_API_SECRET",
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `Cloudinary env vars missing: ${missing.join(", ")}. Check .env.local or your Vercel project settings.`
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key:    apiKey,
    api_secret: apiSecret,
    secure:     true,
  });

  isConfigured = true;
}

// ─── Folder constants ─────────────────────────────────────────────────────────

export const GALLERY_FOLDER = "web-kelas/gallery" as const;
export const MATERI_FOLDER  = "web-kelas/materi"  as const;
export const AVATAR_FOLDER  = "web-kelas/avatars" as const;
export const PROOF_FOLDER   = "web-kelas/proofs"  as const;

// ─── Upload ───────────────────────────────────────────────────────────────────

/**
 * Uploads a Buffer to Cloudinary using upload_stream.
 * @param buffer - File content as a Node.js Buffer
 * @param folder - Target folder (use one of the FOLDER constants above)
 * @returns      - { url: secure_url, publicId: public_id }
 */
export function uploadToCloudinary(
  buffer: Buffer,
  folder: string
): Promise<{ url: string; publicId: string }> {
  ensureConfigured();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload ke Cloudinary gagal."));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Deletes a Cloudinary asset by its public_id.
 * Treats "not found" as success — making the operation idempotent.
 * @param publicId - The Cloudinary public_id of the asset to delete
 * @throws {Error} if Cloudinary returns any result other than "ok" or "not found"
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  ensureConfigured();
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "auto",
  });

  // "not found" means the asset is already gone — treat as success (idempotent)
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(
      `Cloudinary delete gagal untuk ${publicId}: ${result.result}`
    );
  }
}

// ─── Thumbnail transform URL ──────────────────────────────────────────────────

/**
 * Rewrites a Cloudinary URL to include thumbnail transformation parameters.
 * Pure string manipulation — does NOT make a network call.
 *
 * Example:
 *   Input:  https://res.cloudinary.com/.../upload/sample.jpg
 *   Output: https://res.cloudinary.com/.../upload/w_400,c_fill,q_auto,f_auto/sample.jpg
 *
 * @param cloudinaryUrl - Original secure_url from Cloudinary
 * @param width         - Desired width in pixels (default: 400)
 * @returns             - Transformed URL string
 */
export function getOptimizedUrl(
  cloudinaryUrl: string,
  width: number = 400
): string {
  const transform = `w_${width},c_fill,q_auto,f_auto`;
  return cloudinaryUrl.replace("/upload/", `/upload/${transform}/`);
}
