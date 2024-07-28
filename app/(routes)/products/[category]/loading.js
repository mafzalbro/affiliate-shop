import SkeletonSearchBar from '@/app/components/skeletons/SkeletonSearchBar';
import SkeletonCategoryTabs from '@/app/components/skeletons/SkeletonCategoryTabs';
import SkeletonProductList from '@/app/components/skeletons/SkeletonProductList';
import SkeletonPagination from '@/app/components/skeletons/SkeletonPagination';
import SkeletonHeroSection from '@/app/components/skeletons/SkeletonHeroSection';

const loading = () => {
  return (
    <>
    <SkeletonHeroSection desc button/>
      <div className="p-6">
        <SkeletonSearchBar />
        <SkeletonCategoryTabs />
        <SkeletonProductList />
        <SkeletonPagination />
      </div>
    </>
  )
}

export default loading