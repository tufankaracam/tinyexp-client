import ActivityLogCard from '../../components/features/activitylogs/ActivityLogCard/ActivityLogCard';
import CategoryCard from '../../components/features/categories/CategoryCard/CategoryCard';
import EmptyCard from '../../components/shared/EmptyCard/EmptyCard';
import Navbar from '../../components/shared/Navbar/Navbar';
import Wrapper from '../../components/shared/Wrapper/Wrapper';
import css from './activitylogs.module.css';

export const handle = {
  title: "Activity Logs Page",
};

export default function ActivityLogsPage() {
  return (
    <div>
      <Navbar title="Activity Logs"/>
            <Wrapper>
              <ActivityLogCard/>
              <ActivityLogCard/>
              <ActivityLogCard/>
              <ActivityLogCard/>
              <ActivityLogCard/>
              <EmptyCard/>
            </Wrapper>
    </div>
  )
}
