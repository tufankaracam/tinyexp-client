import CategoryCard from '../../components/features/categories/CategoryCard/CategoryCard';
import EmptyCard from '../../components/shared/EmptyCard/EmptyCard';
import Navbar from '../../components/shared/Navbar/Navbar';
import Wrapper from '../../components/shared/Wrapper/Wrapper';
import css from './trackingtypes.module.css';

export default function TrackingTypesPage() {
  return (
    <div>
      <Navbar title="Tracking Types"/>
            <Wrapper>
              <CategoryCard/>
              <EmptyCard/>
            </Wrapper>
    </div>
  )
}
