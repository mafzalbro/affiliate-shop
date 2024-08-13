import SkeletonProductList from '@/app/components/skeletons/SkeletonProductList';
import SkeletonProductDetails from '@/app/components/skeletons/SkeletonProductDetails';
import SkeletonHeroSection from '@/app/components/skeletons/SkeletonHeroSection';

const loading = () => {
  return (
    <>
        <SkeletonHeroSection desc />
      <div className="p-6">
        <SkeletonProductDetails />
        <SkeletonProductList col={2} className="max-w-4xl mx-auto"/>
      </div>
    </>
  )
}

export default loading