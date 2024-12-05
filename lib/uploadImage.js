/* import fetch from 'node-fetch';
import { FormData, Blob } from 'formdata-node';
import { fileTypeFromBuffer } from 'file-type'

export default async buffer => {
  const { ext, mime } = await fileTypeFromBuffer(buffer)
  let form = new FormData()
  const blob = new Blob([buffer.toArrayBuffer()], { type: mime })
  form.append('file', blob, 'tmp.' + ext)
  let res = await fetch('https://pomf2.lain.la/upload.php', {
    method: 'POST',
    body: form
  })
  let img = await res.json()
  if (img.error) throw img.error
  return 'https://telegra.ph' + img[0].src
} */

import { fileTypeFromBuffer } from 'file-type';
import FormData from 'form-data';
import fetch from 'node-fetch';

/**
 * Upload to Pomf2
 * @param {Buffer} content File Buffer
 * @return {Promise<string>}
 */
async function uploadPomf(content) {
  console.log("Uploading to Pomf2...");

  try {
    const { ext, mime } = await fileTypeFromBuffer(content) || {
      ext: "bin",
      mime: "application/octet-stream"
    };

    const formData = new FormData();
    const fileName = `upload_${Date.now()}.${ext || "bin"}`;

    formData.append("files[]", Buffer.from(content), {
      filename: fileName,
      contentType: mime || "application/octet-stream"
    });

    const res = await fetch("https://pomf2.lain.la/upload.php", {
      method: "POST",
      body: formData
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(`Upload failed: ${json.error || 'Unknown error'}`);
    }

    console.log("Uploaded to Pomf2 successfully!");
    return json.files[0]?.url;

  } catch (error) {
    console.error("Upload to Pomf2 failed:", error.message || error);
  }
}