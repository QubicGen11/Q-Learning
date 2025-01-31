import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// Ensure correct path
import { useNavigate } from 'react-router-dom';
import usePreLoginFeedStore from '../../../stores/preLoginFeedStore';
import useWishlistStore from '../../../stores/wishlistStore';
import trackLastViewedCourse from '../../../utils/trackLastViewedCourse';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const RelatedCourses = () => {

    const { favorites, fetchWishlist, toggleWishlist } = useWishlistStore();
    const defaultImage = 'https://images.unsplash.com/photo-1591951425328-48c1fe7179cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJvb2tzfGVufDB8fDB8fHww';

    useEffect(() => {
        fetchWishlist(); // Fetch wishlist when component mounts
    }, []);
    const { cartBasedRecommendations, fetchPreLoginFeed, isLoading } = usePreLoginFeedStore();
    const [visibleCourses, setVisibleCourses] = useState([]); // To control displayed courses
    const [isViewAll, setIsViewAll] = useState(false); // To toggle between limited and full view

    useEffect(() => {
        fetchPreLoginFeed(); // Fetch data on component mount
    }, [fetchPreLoginFeed]);

    const navigate = useNavigate();
    useEffect(() => {
        // Initially display only the first 4 courses
        if (cartBasedRecommendations?.length > 0) {
            setVisibleCourses(cartBasedRecommendations.slice(0, 4));
        }
    }, [cartBasedRecommendations]);

    const handleViewAll = () => {
        if (isViewAll) {
            // Switch back to 4 courses
            setVisibleCourses(cartBasedRecommendations.slice(0, 4));
        } else {
            // Show all courses
            setVisibleCourses(cartBasedRecommendations);
        }
        setIsViewAll(!isViewAll); // Toggle the view state
    };

    const getTagColor = (tag) => {
        switch (tag) {
            case 'New':
                return 'bg-orange-500';
            case 'Best Seller':
                return 'bg-green-500';
            case 'Trending':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <>
            <div className="mt-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Related Courses</h2>
                    {cartBasedRecommendations.length > 4 && (
                        <button
                            onClick={handleViewAll}
                            className="text-[#0073EA] text-sm font-medium"
                        >
                            {isViewAll ? 'SHOW LESS' : 'VIEW ALL'}
                        </button>
                    )}
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <Skeleton height={40} count={5} style={{ marginBottom: '10px' }} /> 
                ) : (
                    <div className="grid grid-cols-4 gap-4">
                        {visibleCourses?.map((course, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-md relative hover:scale-105 transition-all duration-300"
                                onClick={() => trackLastViewedCourse(course.id) && navigate(`/course/${course.id}`)}

                            >
                                <div className="relative">
                                    <img
                                        src={course.courseImage || course.courseBanner || defaultImage}
                                        alt={course.courseName}
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.src = defaultImage;
                                        }}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                    


                                    {/* Add price overlay */}
                                    <div className="absolute bottom-2 right-2 bg-white rounded px-2 py-1 flex items-center gap-1">
                                        <span className="text-sm font-medium text-[#0073EA]">
                                            ₹{course.courseSettings?.[0]?.offeredPrice || 'N/A'}
                                        </span>
                                        <span className="text-xs line-through text-[#0073EA]">
                                            ₹{course.courseSettings?.[0]?.price || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                   
                                    <div className='flex justify-between '>

                                    <h3 className="text-sm font-medium mb-1">{course.courseName}</h3>
                                    <div
                                        className="cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card navigation
                                            toggleWishlist(course.id, e); // Toggle the wishlist state
                                        }}
                                    >
                                        {favorites.has(course.id) ? (
                                            <AiFillHeart className="text-red-500 text-2xl" />
                                        ) : (
                                            <AiOutlineHeart className="text-black text-2xl" />
                                        )}
                                    </div>

                                    </div>
                                    <div className="flex justify-between gap-2 mb-2">
                                        <span
                                            className={`${getTagColor('Trending')} text-white text-xs px-2 py-0.5 rounded`}
                                        >
                                            Trending
                                        </span>
                                        <div className="flex items-center gap-1 mb-1">
                                        <div className="flex">
                                            {[...Array(3)].map((_, i) => (
                                                <span key={i} className="text-yellow-400">
                                                    ★
                                                </span>
                                            ))}
                                            {[...Array(2)].map((_, i) => (
                                                <span key={i} className="text-gray-300">
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500">(4.2 | 420)</span>
                                    </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-1">{course.trainerName}</p>
                                 

                                    <div className="text-xs text-gray-500">
                                        {course.courseDuration} Total hours • Level: {course.difficultyLevel}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default RelatedCourses;
