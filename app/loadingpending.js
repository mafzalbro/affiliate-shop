import SkeletonSearchBar from '@/app/components/skeletons/SkeletonSearchBar';
import SkeletonCategoryTabs from '@/app/components/skeletons/SkeletonCategoryTabs';
import SkeletonProductList from '@/app/components/skeletons/SkeletonProductList';
import SkeletonPagination from '@/app/components/skeletons/SkeletonPagination';
import SkeletonHeroSection from '@/app/components/skeletons/SkeletonHeroSection';
import SkeletonProductSlider from './components/skeletons/SkeletonProductSlider';

const loading = () => {
  return (
    <>
    <SkeletonHeroSection button desc/>
      <div className="p-6">
        <SkeletonProductSlider />
        <SkeletonSearchBar />
        <SkeletonCategoryTabs />
        <SkeletonProductList />
        <SkeletonPagination />
      </div>
    </>
  )
}

export default loading