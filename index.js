import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });

const getcatfacts = () => {
  return new Promise((resolve) => {
  axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3").then((response) => {
  resolve(response.data.map(res=>res.text))
  }).catch((error) => {
    resolve(null)
    console.log(error)
  })
})
}


const getfoximage = () => {
  
  return new Promise((resolve) => {
  axios.get("https://randomfox.ca/floof").then((response) => {
  resolve(response.data.image)
  }).catch((error) => {
    resolve(null)
    console.log(error)
  })
}
  )}

const getholiday = (country) => {
  
  return new Promise((resolve) => {
  axios.get(`https://date.nager.at/api/v2/PublicHolidays/2021/${country}`).then((response) => {
  resolve(response.data)
  }).catch((error) => {
    resolve(null)
    console.log(error)
  })
}
  )}

const fetchapi = async(country) => {
  const catFacts = await getcatfacts();
  const foxPicture =  await getfoximage();
  const holidays = await getholiday(country);
  return Promise.all([catFacts, foxPicture, holidays]).then(() => {
    return {
      foxPicture,catFacts,holidays
    }
})
}


app.post('/', async (req, res) => {
  return fetchapi(req.body.countryCode)
});

// Run the server!
const start = async () => {
  try {
    await app.listen(5000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
