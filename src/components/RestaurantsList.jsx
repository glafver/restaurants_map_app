import { Row } from 'react-bootstrap'
import RestaurantsListCard from './RestaurantsListCard';

const RestaurantsList = ({ restaurants }) => {

    return (

        <>
            <Row className="overflow-auto" style={{ height : '620px'}}>
                {restaurants && restaurants.map((restaurant, index) => (
                    <RestaurantsListCard key={index} restaurant={restaurant}></RestaurantsListCard>
                ))}
            </Row>
        </>

    )
}

export default RestaurantsList