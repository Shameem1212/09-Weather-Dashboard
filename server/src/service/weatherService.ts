import dotenv from 'dotenv';
import dayjs from 'dayjs';
dotenv.config();
// function parseCurrentWeather(_data: any) {

// }
// export parseCurrentWeather from weatherService

// const weatherData = {};
// parseCurrentWeather(weatherData);

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;


}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  tempt: number;
  speed: number;
  humidity: number;
  icon: string;
  iconDescription: string;

  constructor(city: string, date: string, tempt: number, speed: number, humidity: number, icon: string, iconDescription: string) {
    this.city = city;
    this.date = date;
    this.tempt = tempt;
    this.speed = speed;
    this.humidity = humidity;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}
// TODO: Complete the WeatherService class
export class WeatherService {
  city!: string;

  static getWeatherForCity(_city: any) {
    throw new Error('Method not implemented.');
  }
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;

  private apiKey?: string;

  constructor() {

    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const response = await fetch(query);
    const apiData = await response.json();
    console.log(apiData);
    return apiData;
  }
  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    const structuredLocation = this.destructureLocationData(locationData);
    console.log("processed Location Data:", structuredLocation);
    return structuredLocation
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    const url = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=4@appid = ${this.apiKey}`
    return url
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    const queryurl = `${this.baseURL}/org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`
    return queryurl;
  }
  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData() {
    const data = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(data);
  }
  //  TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await (await fetch(this.buildWeatherQuery(coordinates))).json();

    if (!response) {
      throw new Error("Weather Data Not Found");
    };

  }
  // TODO: Build parseCurrentWeather method
  parseCurrentWeather(response: any) {
    const parseDate = dayjs.unix(response.dt).format('M/D/YYYY');

    const currentWeather = new Weather(
      this.city,
      parseDate,
      response.date.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].description || response.weather[0].main
    );

    return currentWeather;
  }

  /*constructor (private currentWeather: Weather, private weatherData: any[]) {
     super();
   this.buildForecastArray(this.currentWeather, this.weatherData);
  }*/

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {

    this.city = city
    const coordinates = await this.fetchAndDestructureLocationData();
    if (coordinates) {
      const weather = await this.fetchWeatherData(coordinates);
      return weather;

    }

  }
}



