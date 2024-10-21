import express, { Request, Response, NextFunction } from "express";
import isAuthenticated from "../middleware/IsAuthenticated";
import Users from "../services/usersService";
import fs from "fs";
import puppeteer, { Browser } from "puppeteer";
import path from "path";
import Vehicles from "../services/vehiclesService";

const router = express.Router();

class a {
  static browser: Browser | undefined;

  static async getBrowser() {
    if (!this.browser)
      this.browser = await puppeteer.launch();
    
    return this.browser;
  }
}

router.get('/', isAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user_id: number = req.body.user_id;
    const vehicles = await Users.get_vehicles(user_id);

    const user_vehicles = await Promise.all(vehicles.map(async (vehicle) => {
      const { seller_id, ...vehicle_info } = vehicle;
      return {
        ...vehicle_info,
        images: await Vehicles.get_images(vehicle.id)
      };
    }));

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      ${(user_vehicles).map((vehicle) => `
        <div class="car-box">
          <div class="car-name">
              <h1>${vehicle.name}</h1>
          </div>
          <div class="car-description">
              <p>Ano: ${vehicle.year}</p>
              <p>Km: ${vehicle.mileage}</p>
              <p>Câmbio: ${vehicle.transmission}</p>
              <p>Combustivel: ${vehicle.fuel_type}</p>
              <p>Motor: ${vehicle.engine}</p>
          </div>
          <div class="technologies">
              <img src="" alt="">
              <img src="" alt="">
          </div>
        </div>
      `).join("")}
      </html>
    `;
    
    const relative_path = `./tmp/${user_id}.pdf`;

    const browser = await a.getBrowser();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: relative_path, format: 'A4' })
    
    res.sendFile(
      path.join(__dirname, "..", "..", relative_path), 
      () => fs.unlinkSync(relative_path)
    );
  }
  catch (err) {
    next(err);
  }
});

export default router;
