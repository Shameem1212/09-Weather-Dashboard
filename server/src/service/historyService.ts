// TODO: Define a City class with name and id properties
import fs from 'fs';
import {v4 as uuidv4} from 'uuid'
import * as path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}


// TODO: Complete the HistoryService class
// interface City {
//   id: number;
//   name: string;
//   country: string;
// }
class HistoryService {
  private filePath: string;
  constructor() {
    this.filePath = path.join(__dirname, 'searchHistory.json');
  }


  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(`Error reading the file: ${err.message}`);
          return;
        }
        try {
          const cities: City[] = JSON.parse(data);
          resolve(cities);
        } catch (parseError) {
          reject(`Error parsing the JSON data: ${parseError}`);
        }
      });
    });
  }
  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, JSON.stringify(cities, null), 'utf-8', (err) => {
        if (err) {
          reject(`Error writing to the file: ${err.message}`);
          return;
        }
        resolve();
      });
    });
  }
  async getCities(): Promise<City[]> {
    try {
      return await this.read();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async addCity(city: string): Promise<void> {
    try {
      const cities = await this.read();
      const newCity: City = {name: city, id: uuidv4() }
  
      const cityExists = cities.some(existingCity => existingCity.name === newCity.name);

      if (!cityExists) {
        cities.push(newCity);
        await this.write(cities);
      } else {
        console.log('City already exists in the search history.');
      }
    } catch (error) {
      console.error('Error adding city:', error);
    }
  }

  // Method to remove a city from the searchHistory.json file by city id
  async removeCity(id: string): Promise<void> {
    try {
      const cities = await this.read();
      const updatedCities = cities.filter((city) => city.id !== id);
      await this.write(updatedCities);
    } catch (error) {
      console.error('Error removing city:', error);
    }
  }
}






// TODO: Define a read method that reads from the searchHistory.json file
// TODO: Define a write method that writes the updated cities array to the searchHistory.json file
// private async write(cities: City[]) {}
// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// async getCities() {}
// TODO Define an addCity method that adds a city to the searchHistory.json file
// async addCity(city: string) {}
// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}



export default new HistoryService();
