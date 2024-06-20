import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { counts } from '../utils/data';
import CountsCard from '../Component/Cards/CountsCard';
import WeeklyStatCards from '../Component/Cards/WeeklyStatCards';
import CategoryCard from '../Component/Cards/CategoryCard';
import Addworkouts from '../Component/Addworkouts';
import WorkoutCard from '../Component/Cards/WorkoutCards';
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

const Container=styled.div`
 flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: auto;
`;
const Wrapper=styled.div`
 flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow-y: auto;

  @media (max-width: 600px) {
    gap: 12px;
}`;
const Tittle=styled.div`
padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;

const FlexItem=styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 22px;
padding: 0px 16px;
@media (max-width: 600px) {
  gap: 12px;
}`;

const FlexWrap=styled.div`
 display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  //margin-bottom:130px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
    //margin-bottom:130px;
}`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 140px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;



const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState(`#Legs
-Back Squat
-5 sets
-15 reps
-30 kg
-10 min`);
  
  

  const dashboardData = async () => {

    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getDashboardDetails(token);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res?.data?.todaysWorkouts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addNewWorkout = async () => {
      setButtonLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      try {
        await addWorkout(token, { workoutString: workout });
        await dashboardData();
        await getTodaysWorkout();
      } catch (err) {
        alert(err.message);
      } finally {
        setButtonLoading(false);
      }
  };

  useEffect(() => {
    dashboardData();
    getTodaysWorkout(); 
  }, []);
  
  return (
    <Container>
        <Wrapper>
            <Tittle>
              DASHBOARD
            </Tittle>
            <FlexItem>
            {counts.map((item) => (
            <CountsCard item={item} data={data} />
          ))}
            </FlexItem>
          <FlexWrap>
          <WeeklyStatCards data={data} />
          <CategoryCard data={data}/>
          <Addworkouts 
          workout={workout}
          setWorkout={setWorkout}
          addNewWorkout={addNewWorkout}
          buttonLoading={buttonLoading}
          />
          </FlexWrap>
          <Section>
          <Tittle>Todays Workouts</Tittle>
          <CardWrapper>
            
          {todaysWorkouts.map((workout) => (
              <WorkoutCard workout={workout} />
            ))}
          </CardWrapper>
        </Section>
        </Wrapper>
    </Container>
    
  )
}

export default Dashboard;