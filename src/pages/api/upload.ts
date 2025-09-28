import { IncomingForm } from "formidable";
import fs from "fs";
import { parse } from "csv-parse";
import prisma from "../../lib/db";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const file = files.file[0];
    const content = fs.readFileSync(file.filepath);
    parse(content, { columns: true }, async (err, records) => {
      for (const record of records) {
        await prisma.product.create({
          data: {
            title: record.title,
            price: parseFloat(record.price),
            imageUrl: record.imageUrl,
            gstin: record.gstin,
            upc: record.upc,
            ean: record.ean
          }
        });
      }
      res.status(200).json({ success: true });
    });
  });
}
