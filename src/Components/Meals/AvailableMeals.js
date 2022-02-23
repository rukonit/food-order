import styles from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import axios from 'axios';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
   
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState(null)

    useEffect(() => {
      const fetchMeals = async () => 
        {
        const response  = await axios.get('https://food-order-backend-c480a-default-rtdb.firebaseio.com/meals.json')
        .catch(error => {
          setHttpError(error.message)
          console.log(error.message);
          setIsLoading(false)
        })
        const resData = response.data

        const loadedMeals = []

        for (const key in resData) {
          loadedMeals.push({
            id: key,
            name: resData[key].name,
            description: resData[key].description,
            price: resData[key].price
          })
          
        }

        setMeals(loadedMeals)

          setIsLoading(false)
  
   


        }

        fetchMeals()
      }, [])

      if(httpError) {
        return <section className={styles.MealIsLoading}><p>{httpError}</p></section>
      }

      if(isLoading) {
        return <section className={styles.MealIsLoading}><p>Laoding..</p></section>
      }
    const mealList = meals.map(meal => <MealItem key ={meal.id} id ={meal.id} name={meal.name} description={meal.description} price={meal.price} />)

    return (
        <section className={styles.meals}>
          <Card>            
            <ul>
              {mealList}                  
            </ul>
            </Card>

        </section>
    )
}

export default AvailableMeals