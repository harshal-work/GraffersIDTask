import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  SafeAreaView,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PURPLE = '#211b47';

// Dynamic responsive values
const scaleFont = (size) => {
  const scale = screenWidth / 375;
  return Math.min(size * scale, size);
};

const scaleWidth = (size) => {
  const scale = screenWidth / 375;
  return size * scale;
};

const scaleHeight = (size) => {
  const scale = screenHeight / 812;
  return size * scale;
};

// Sample reviews data
const sampleReviews = [
  {
    id: '1',
    userName: 'Jorge Watson',
    date: '01-01-2022, 14:33',
    rating: 5,
    review: 'Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Utrices ac at nibh et. Aliquam aliquam ultricies ac pulvinar eleifend duis. Eget congue fringilla quam ut mattis tortor posuere semper ac. Sem egestas vestibulum faucibus montes. Gravida sit non arcu consequat.',
    likes: 24,
    likedByUser: false,
  },
  {
    id: '2',
    userName: 'Jenny kole',
    date: '12-01-2022, 15:00',
    rating: 4,
    review: 'Graffersid one of the best Company dolor sit amet, consectetur adipiscing elit. Congue netus feugiat elit suspendisse commodo. Pellentesque risus suspendisse mattis et massa. Utrices ac at nibh et.',
    likes: 18,
    likedByUser: false,
  },
  {
    id: '3',
    userName: 'Michael Chen',
    date: '15-02-2022, 11:25',
    rating: 5,
    review: 'Excellent service and professional team. They delivered our project on time with great quality. Highly recommended for web development projects.',
    likes: 32,
    likedByUser: false,
  },
  {
    id: '4',
    userName: 'Sarah Williams',
    date: '20-03-2022, 09:15',
    rating: 4,
    review: 'Good experience working with them. The communication was clear and the final product met our expectations.',
    likes: 15,
    likedByUser: false,
  },
  {
    id: '5',
    userName: 'Alex Rodriguez',
    date: '05-04-2022, 16:45',
    rating: 5,
    review: 'Outstanding mobile app development. The team was innovative and solved complex problems efficiently.',
    likes: 28,
    likedByUser: false,
  },
];

export default function CompanyDetailScreen({ route, navigation }) {
  const { company } = route.params;
  const [reviews, setReviews] = useState(sampleReviews);
  const [addReviewModalVisible, setAddReviewModalVisible] = useState(false);
  const [successPopup, setSuccessPopup] = useState('');
  const [errorPopup, setErrorPopup] = useState('');
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    review: '',
  });
  const [filteredReviews, setFilteredReviews] = useState(sampleReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLikes, setUserLikes] = useState({}); // Track user likes per review

  // Load user data and reviews on mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load user info
      const userData = await AsyncStorage.getItem('USER');
      if (userData) {
        const user = JSON.parse(userData);
        // Load user likes for this company
        const likesData = await AsyncStorage.getItem(`USER_LIKES_${company.id}`);
        if (likesData) {
          setUserLikes(JSON.parse(likesData));
        }
      }

      // Load user reviews
      await loadUserReviews();
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const loadUserReviews = async () => {
    try {
      const stored = await AsyncStorage.getItem(`USER_REVIEWS_${company.id}`);
      if (stored) {
        const userReviews = JSON.parse(stored);
        const allReviews = [...sampleReviews, ...userReviews];
        setReviews(allReviews);
        setFilteredReviews(allReviews);
      }
    } catch (error) {
      console.log('Error loading reviews:', error);
    }
  };

  const saveUserReview = async (review) => {
    try {
      const stored = await AsyncStorage.getItem(`USER_REVIEWS_${company.id}`);
      const userReviews = stored ? JSON.parse(stored) : [];
      const newUserReviews = [...userReviews, review];
      await AsyncStorage.setItem(`USER_REVIEWS_${company.id}`, JSON.stringify(newUserReviews));
    } catch (error) {
      console.log('Error saving review:', error);
    }
  };

  const saveUserLikes = async (likes) => {
    try {
      await AsyncStorage.setItem(`USER_LIKES_${company.id}`, JSON.stringify(likes));
    } catch (error) {
      console.log('Error saving likes:', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddReview = async () => {
    if (!newReview.userName.trim() || !newReview.review.trim()) {
      setErrorPopup('Please enter your name and review');
      return;
    }

    const userReview = {
      id: `${Date.now()}`,
      userName: newReview.userName.trim(),
      date: `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}, ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
      rating: newReview.rating,
      review: newReview.review.trim(),
      likes: 0,
      likedByUser: false,
    };

    // Save to AsyncStorage
    await saveUserReview(userReview);

    // Update state
    const updatedReviews = [...reviews, userReview];
    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews);
    
    // Reset form
    setNewReview({
      userName: '',
      rating: 5,
      review: '',
    });
    
    // Close modal
    setAddReviewModalVisible(false);
    
    // Show success popup
    setSuccessPopup('Review added successfully!');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(review =>
        review.userName.toLowerCase().includes(query.toLowerCase()) ||
        review.review.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  };

  const handleLikeReview = async (reviewId) => {
    if (userLikes[reviewId]) {
      // User already liked this review
      return;
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, likes: review.likes + 1, likedByUser: true };
      }
      return review;
    });

    const newUserLikes = { ...userLikes, [reviewId]: true };
    setUserLikes(newUserLikes);
    await saveUserLikes(newUserLikes);

    setReviews(updatedReviews);
    setFilteredReviews(updatedReviews.filter(review => 
      searchQuery === '' || 
      review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../../../assets/star.png')}
          style={[
            styles.starIcon,
            {
              width: scaleWidth(16),
              height: scaleHeight(16),
              tintColor: i <= rating ? '#facc15' : '#d1d5db',
            }
          ]}
        />
      );
    }
    return stars;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={[styles.reviewerName, { fontSize: scaleFont(16) }]}>{item.userName}</Text>
          <Text style={[styles.reviewDate, { fontSize: scaleFont(12) }]}>{item.date}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {renderStars(item.rating)}
        </View>
      </View>
      
      <Text style={[styles.reviewText, { fontSize: scaleFont(14) }]}>{item.review}</Text>
      
      <View style={styles.reviewFooter}>
        <TouchableOpacity 
          style={[
            styles.likeButton,
            userLikes[item.id] && styles.likeButtonLiked
          ]}
          onPress={() => handleLikeReview(item.id)}
          disabled={userLikes[item.id]}
        >
          <Image
            source={require('../../../assets/like.png')}
            style={[
              styles.likeIcon, 
              { 
                width: scaleWidth(16), 
                height: scaleHeight(16),
                tintColor: userLikes[item.id] ? '#facc15' : '#7A1FFF'
              }
            ]}
          />
          <Text style={[
            styles.likeCount, 
            { fontSize: scaleFont(12) },
            userLikes[item.id] && { color: '#facc15' }
          ]}>
            {item.likes}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.divider} />
    </View>
  );

  const getBottomPadding = () => {
    if (Platform.OS === 'ios') {
      return scaleHeight(34);
    }
    return scaleHeight(20);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={PURPLE} barStyle="light-content" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Image 
            source={require('../../../assets/back.png')} 
            style={[styles.backIcon, { width: scaleWidth(24), height: scaleHeight(24) }]} 
          />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { fontSize: scaleFont(18) }]}>
          Company Details
        </Text>
        
        <View style={[styles.headerSpacer, { width: scaleWidth(40) }]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getBottomPadding() + scaleHeight(100) }
        ]}
      >
        {/* COMPANY INFO CARD */}
        <View style={styles.companyInfoCard}>
          <Image 
            source={company.logo} 
            style={[
              styles.companyLogo,
              { width: scaleWidth(80), height: scaleHeight(80) }
            ]} 
          />
          
          <Text style={[styles.companyName, { fontSize: scaleFont(22) }]}>
            {company.name}
          </Text>
          
          <Text style={[styles.companyAddress, { fontSize: scaleFont(14) }]}>
            @ {company.address}
          </Text>
          
          <View style={styles.ratingSection}>
            <View style={styles.ratingBox}>
              <Text style={[styles.ratingNumber, { fontSize: scaleFont(28) }]}>
                {calculateAverageRating().toFixed(1)}
              </Text>
              <View style={styles.starsRow}>
                {renderStars(Math.round(calculateAverageRating()))}
              </View>
              <Text style={[styles.ratingLabel, { fontSize: scaleFont(14) }]}>
                {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
              </Text>
            </View>
          </View>
          
          <View style={styles.companyDetails}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { fontSize: scaleFont(13) }]}>Founded:</Text>
              <Text style={[styles.detailValue, { fontSize: scaleFont(13) }]}>{company.founded}</Text>
            </View>
            {company.category && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontSize: scaleFont(13) }]}>Category:</Text>
                <Text style={[styles.detailValue, { fontSize: scaleFont(13) }]}>{company.category}</Text>
              </View>
            )}
            {company.employees && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontSize: scaleFont(13) }]}>Employees:</Text>
                <Text style={[styles.detailValue, { fontSize: scaleFont(13) }]}>{company.employees}</Text>
              </View>
            )}
          </View>
          
          {company.description && (
            <Text style={[styles.companyDescription, { fontSize: scaleFont(14) }]}>
              {company.description}
            </Text>
          )}
        </View>

        {/* REVIEWS HEADER */}
        <View style={styles.reviewsHeader}>
          <Text style={[styles.reviewsTitle, { fontSize: scaleFont(18) }]}>
            Reviews ({reviews.length})
          </Text>
          
          <View style={styles.searchContainer}>
            <Image
              source={require('../../../assets/search.png')}
              style={[styles.searchIcon, { width: scaleWidth(16), height: scaleHeight(16) }]}
            />
            <TextInput
              style={[styles.searchInput, { fontSize: scaleFont(14) }]}
              placeholder="Search reviews..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* REVIEWS LIST */}
        {filteredReviews.length > 0 ? (
          <FlatList
            data={filteredReviews}
            renderItem={renderReviewItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.noReviewsContainer}>
                <Text style={[styles.noReviewsText, { fontSize: scaleFont(16) }]}>
                  No reviews found
                </Text>
              </View>
            }
          />
        ) : (
          <View style={styles.noReviewsContainer}>
            <Text style={[styles.noReviewsText, { fontSize: scaleFont(16) }]}>
              No reviews yet
            </Text>
            <Text style={[styles.noReviewsSubtext, { fontSize: scaleFont(14) }]}>
              Be the first to review this company!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* ADD REVIEW BUTTON */}
      <TouchableOpacity
        style={[
          styles.addReviewButton,
          {
            bottom: getBottomPadding() + scaleHeight(20),
            paddingVertical: scaleHeight(16),
            paddingHorizontal: scaleWidth(24),
          }
        ]}
        onPress={() => setAddReviewModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.addReviewText, { fontSize: scaleFont(16) }]}>+ Add Review</Text>
      </TouchableOpacity>

      {/* ADD REVIEW MODAL - BOTTOM SHEET */}
      <Modal
        visible={addReviewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddReviewModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlayFull} 
          activeOpacity={1}
          onPress={() => setAddReviewModalVisible(false)}
        >
          <View style={styles.modalContainerBottom}>
            <View style={styles.modalHandle} />
            
            <View style={[
              styles.modalContentBottom,
              { padding: scaleWidth(20) }
            ]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { fontSize: scaleFont(20) }]}>
                  Write a Review
                </Text>
              </View>

              <Text style={[styles.modalCompanyName, { fontSize: scaleFont(18) }]}>
                {company.name}
              </Text>
              
              <View style={styles.ratingInputSection}>
                <Text style={[styles.ratingLabel, { fontSize: scaleFont(15) }]}>
                  Your Rating:
                </Text>
                <View style={styles.starsInputContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setNewReview({ ...newReview, rating: star })}
                      style={styles.starButton}
                    >
                      <Image
                        source={require('../../../assets/star.png')}
                        style={[
                          styles.starInputIcon,
                          {
                            width: scaleWidth(28),
                            height: scaleHeight(28),
                            tintColor: star <= newReview.rating ? '#facc15' : '#d1d5db',
                          }
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={[styles.ratingValue, { fontSize: scaleFont(14) }]}>
                  {newReview.rating}.0
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { fontSize: scaleFont(14) }]}>
                  Your Name *
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { fontSize: scaleFont(15), height: scaleHeight(48) }
                  ]}
                  placeholder="Enter your name"
              placeholderTextColor="gray"
                  value={newReview.userName}
                  onChangeText={(text) => setNewReview({ ...newReview, userName: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.inputLabel, { fontSize: scaleFont(14) }]}>
                  Your Review *
                </Text>
                <TextInput
                  style={[
                    styles.textArea,
                    {
                      fontSize: scaleFont(15),
                      height: scaleHeight(120),
                      textAlignVertical: 'top',
                    }
                  ]}
                  placeholder="Share your experience with this company..."
              placeholderTextColor="gray"
                  multiline
                  numberOfLines={5}
                  value={newReview.review}
                  onChangeText={(text) => setNewReview({ ...newReview, review: text })}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.cancelButton,
                    { paddingVertical: scaleHeight(14) }
                  ]}
                  onPress={() => setAddReviewModalVisible(false)}
                >
                  <Text style={[styles.cancelButtonText, { fontSize: scaleFont(15) }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    { paddingVertical: scaleHeight(14) }
                  ]}
                  onPress={handleAddReview}
                >
                  <Text style={[styles.submitButtonText, { fontSize: scaleFont(15) }]}>
                    Submit Review
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* SUCCESS POPUP */}
      <Modal transparent visible={successPopup.length > 0} animationType="fade">
        <View style={styles.popupBg}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>{successPopup}</Text>
            <TouchableOpacity 
              onPress={() => {
                setSuccessPopup('');
              }}
            >
              <Text style={styles.popupBtn}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ERROR POPUP */}
      <Modal transparent visible={errorPopup.length > 0} animationType="fade">
        <View style={styles.popupBg}>
          <View style={styles.popup}>
            <Text style={[styles.popupText, styles.errorText]}>{errorPopup}</Text>
            <TouchableOpacity 
              onPress={() => {
                setErrorPopup('');
              }}
            >
              <Text style={styles.popupBtn}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: Platform.OS === 'ios' ? 0 : 25,
  },
  scrollContent: {
    paddingHorizontal: scaleWidth(16),
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: scaleWidth(8),
  },
  backIcon: {
    tintColor: PURPLE,
  },
  headerTitle: {
    fontWeight: '800',
    color: PURPLE,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },

  /* COMPANY INFO CARD */
  companyInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: scaleWidth(20),
    marginTop: scaleHeight(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  companyLogo: {
    borderRadius: 12,
    marginBottom: scaleHeight(16),
  },
  companyName: {
    fontWeight: '800',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: scaleHeight(8),
    lineHeight: 28,
  },
  companyAddress: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: scaleHeight(20),
    lineHeight: 20,
  },
  ratingSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  ratingBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: scaleWidth(20),
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  ratingNumber: {
    fontWeight: '800',
    color: PURPLE,
    marginBottom: scaleHeight(8),
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: scaleHeight(8),
  },
  starIcon: {
    marginHorizontal: 2,
  },
  ratingLabel: {
    color: '#6b7280',
    fontWeight: '600',
  },
  companyDetails: {
    width: '100%',
    marginBottom: scaleHeight(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(8),
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f6',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#4b5563',
  },
  detailValue: {
    color: '#6b7280',
  },
  companyDescription: {
    color: '#4b5563',
    lineHeight: 22,
    textAlign: 'center',
  },

  /* REVIEWS HEADER */
  reviewsHeader: {
    marginTop: scaleHeight(24),
    marginBottom: scaleHeight(16),
  },
  reviewsTitle: {
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: scaleHeight(12),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    paddingHorizontal: scaleWidth(12),
    height: scaleHeight(44),
  },
  searchIcon: {
    tintColor: '#7A1FFF',
    marginRight: scaleWidth(8),
  },
  searchInput: {
    flex: 1,
    color: '#1f2937',
  },

  /* REVIEW CARD */
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: scaleWidth(16),
    marginBottom: scaleHeight(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(12),
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: scaleHeight(4),
  },
  reviewDate: {
    color: '#9ca3af',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewText: {
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: scaleHeight(12),
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleWidth(10),
    borderRadius: 8,
    backgroundColor: '#f1f3f6',
  },
  likeButtonLiked: {
    backgroundColor: '#fef3c7',
  },
  likeIcon: {
    marginRight: scaleWidth(4),
  },
  likeCount: {
    color: '#6b7280',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginTop: scaleHeight(16),
  },

  /* NO REVIEWS */
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: scaleHeight(40),
  },
  noReviewsText: {
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: scaleHeight(8),
  },
  noReviewsSubtext: {
    color: '#9ca3af',
  },

  /* ADD REVIEW BUTTON */
  addReviewButton: {
    position: 'absolute',
    backgroundColor: PURPLE,
    borderRadius: 16,
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  addReviewText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  /* BOTTOM SHEET MODAL STYLES */
  modalOverlayFull: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    maxHeight: screenHeight * 0.85,
  },
  modalHandle: {
    alignSelf: 'center',
    width: scaleWidth(36),
    height: scaleHeight(4),
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(8),
  },
  modalContentBottom: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(16),
  },
  modalTitle: {
    fontWeight: '800',
    color: PURPLE,
  },
  modalCompanyName: {
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: scaleHeight(24),
    textAlign: 'center',
  },
  ratingInputSection: {
    alignItems: 'center',
    marginBottom: scaleHeight(24),
  },
  starsInputContainer: {
    flexDirection: 'row',
    marginVertical: scaleHeight(12),
  },
  starButton: {
    padding: scaleWidth(4),
  },
  starInputIcon: {
    marginHorizontal: scaleWidth(4),
  },
  ratingLabel: {
    fontWeight: '600',
    color: '#4b5563',
  },
  ratingValue: {
    color: '#6b7280',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: scaleHeight(16),
  },
  inputLabel: {
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: scaleHeight(8),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: scaleWidth(16),
    backgroundColor: '#fafbfc',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(12),
    backgroundColor: '#fafbfc',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(24),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f1f3f6',
    borderRadius: 12,
    alignItems: 'center',
    marginRight: scaleWidth(8),
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  submitButton: {
    flex: 2,
    backgroundColor: PURPLE,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: scaleWidth(8),
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  /* POPUP STYLES */
  popupBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
  },
  popupText: { 
    fontSize: 15, 
    marginBottom: 12, 
    textAlign: 'center',
    color: '#1f2937'
  },
  errorText: {
    color: '#ef4444'
  },
  popupBtn: { 
    fontWeight: '700', 
    color: PURPLE,
    fontSize: 16
  },
});
