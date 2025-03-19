import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
  import { WeatherService } from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, _res: Response) => {
  // TODO: GET weather data from city name
  console.log(req.body, "POSt")
  try {
    const city = req.body.cityName;
    WeatherService.getWeatherForCity(city),((data: ((value: void) => void | PromiseLike<void>) | null | undefined) => {
      HistoryService.addCity(city).then(data, _any => {
        console.log(data)
      })
    })
  } catch (err) {
    console.log("Errr", err)
  }
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
    .then(data => {
      return res.json(data)
    })
  
 });

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => { 
  HistoryService.removeCity(req.params.id)
  .then(_resp => {
    res.json({"message":"City deleted"})
  })
});

export default router;
