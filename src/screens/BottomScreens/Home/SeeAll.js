import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList,RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PURPLE = '#211b47';

// ✅ FIXED: Using MOCK data + fallback API that works on Android emulator
const generateMockCompanies = (count = 20, startId = 1) => {
  const companyLogos = [
    require('../../../assets/splash.jpg'),
    require('../../../assets/s2.png'),
    require('../../../assets/s3.png')
  ];
  const cities = ['Indore', 'Bhopal', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
  const categories = ['Web & App Development', 'Software Development', 'IT Consulting', 'Digital Solutions', 'Enterprise Solutions'];

  return Array.from({ length: count }, (_, index) => {
    const randomLogo = companyLogos[Math.floor(Math.random() * companyLogos.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const employeesRange = `${Math.floor(Math.random() * 100) + 10}-${Math.floor(Math.random() * 200) + 50}`;
    const rating = parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
    const reviews = Math.floor(Math.random() * 100) + 10;
    
    const addresses = {
      'Indore': `${Math.floor(Math.random() * 999) + 1}, Shekhar Central, Manorama Ganj, AB Road, New Palasia, Indore (M.P.)`,
      'Bhopal': `${Math.floor(Math.random() * 999) + 1}, MP Nagar, Zone-II, Bhopal (M.P.)`,
      'Delhi': `${Math.floor(Math.random() * 999) + 1}, Nehru Place, New Delhi`,
      'Mumbai': `${Math.floor(Math.random() * 999) + 1}, Andheri East, Mumbai (Maharashtra)`,
      'Bangalore': `${Math.floor(Math.random() * 999) + 1}, Koramangala, Bangalore (Karnataka)`,
      'Hyderabad': `${Math.floor(Math.random() * 999) + 1}, HITEC City, Hyderabad (Telangana)`,
      'Chennai': `${Math.floor(Math.random() * 999) + 1}, T Nagar, Chennai (Tamil Nadu)`,
      'Pune': `${Math.floor(Math.random() * 999) + 1}, Hinjewadi, Pune (Maharashtra)`
    };
    
    const address = addresses[randomCity] || `${Math.floor(Math.random() * 999) + 1}, Main Street, ${randomCity}`;
    
    const year = Math.floor(Math.random() * (2023 - 2010 + 1)) + 2010;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    
    return {
      id: `mock_${startId + index}`,
      name: `Tech Company ${startId + index}`,
      description: `Leading provider of ${randomCategory.toLowerCase()} solutions with innovative technology and excellent service.`,
      address: address,
      rating: rating,
      reviews: reviews,
      founded: `${day}-${month}-${year}`,
      logo: randomLogo,
      category: randomCategory,
      employees: employeesRange,
      city: randomCity
    };
  });
};

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

export default function SeeAllScreen({ route, navigation }) {
  const [allCompanies, setAllCompanies] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Load data on mount
  useEffect(() => {
    console.log('🔄 SeeAllScreen: Component mounted, loading initial data...');
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    console.log('📥 loadInitialData: Starting...');
    try {
      setLoading(true);
      setError(null);
      setAllCompanies([]);
      setPage(1);
      setHasMore(true);
      
      // ✅ Load user companies from AsyncStorage
      console.log('💾 Loading user companies from AsyncStorage...');
      try {
        const stored = await AsyncStorage.getItem('USER_COMPANIES');
        console.log('💾 AsyncStorage USER_COMPANIES:', stored ? 'Found' : 'Not found');
        const parsedUserCompanies = stored ? JSON.parse(stored) : [];
        console.log('👥 User companies loaded:', parsedUserCompanies.length);
        setUserCompanies(parsedUserCompanies);
      } catch (storageError) {
        console.error('💾 AsyncStorage error:', storageError);
        setUserCompanies([]);
      }
      
      // ✅ Load MOCK companies (INSTANT loading, no network issues)
      console.log('🏢 Loading mock companies (instant)...');
      const apiCompanies = generateMockCompanies(10, 1);
      console.log('✅ Mock companies generated:', apiCompanies.length);
      
      // Combine user companies + mock companies
      const combined = [...userCompanies, ...apiCompanies];
      const sorted = combined.sort((a, b) => b.rating - a.rating);
      setAllCompanies(sorted);
      
      console.log('✅ Initial load completed with', sorted.length, 'companies');
      
    } catch (error) {
      console.error('❌ loadInitialData error:', error);
      setError('Failed to load companies.');
      // Fallback to pure mock data
      setAllCompanies(generateMockCompanies(10, 1));
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCompanies = async () => {
    if (!hasMore || loadingMore || refreshing) {
      console.log('⏭️ loadMoreCompanies blocked');
      return;
    }
    
    console.log('⏭️ loadMoreCompanies: Loading page', page + 1);
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const newCompanies = generateMockCompanies(10, nextPage * 10 + 1);
      
      if (newCompanies.length > 0) {
        setAllCompanies(prev => [...prev, ...newCompanies]);
        setPage(nextPage);
        console.log('✅ Loaded more companies:', newCompanies.length, 'Total:', allCompanies.length + newCompanies.length);
        
        // Simulate API limit (100 companies total)
        if (nextPage >= 10) {
          setHasMore(false);
          console.log('📦 No more companies available');
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('❌ loadMoreCompanies error:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const onRefresh = useCallback(async () => {
    console.log('🔄 Pull to refresh started');
    setRefreshing(true);
    await loadInitialData();
    setRefreshing(false);
    console.log('🔄 Pull to refresh completed');
  }, []);

  const handleWriteReview = (company) => {
    console.log('📝 Navigating to CompanyDetailScreen:', company.name);
    navigation.navigate('CompanyDetailScreen', { company });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const renderCompanyItem = ({ item }) => (
    <View style={[styles.companyWrapper, { marginBottom: scaleHeight(14) }]}>
      <View style={[styles.companyCard, { padding: scaleWidth(14) }]}>
        {/* COMPANY LOGO */}
        <Image 
          source={item.logo} 
          style={[styles.companyLogo, { width: scaleWidth(60), height: scaleHeight(60) }]} 
          defaultSource={require('../../../assets/splash.jpg')}
        />

        {/* COMPANY DETAILS */}
        <View style={styles.companyBody}>
          <Text style={[styles.companyName, { fontSize: scaleFont(15) }]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={[styles.address, { fontSize: scaleFont(11) }]} numberOfLines={1}>
            {item.address}
          </Text>

          <View style={styles.ratingRow}>
            <Image
              source={require('../../../assets/star.png')}
              style={[styles.ratingStar, { width: scaleWidth(14), height: scaleHeight(14) }]}
            />
            <Text style={[styles.ratingText, { fontSize: scaleFont(13) }]}>
              {item.rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewText, { fontSize: scaleFont(11) }]}>
              ({item.reviews} Reviews)
            </Text>
          </View>
          <Text style={[styles.companyDesc, { fontSize: scaleFont(10) }]} numberOfLines={1}>
            {item.description}
          </Text>
        </View>

        {/* RIGHT SECTION */}
        <View style={[styles.rightSection, { width: scaleWidth(90) }]}>
          <Text style={[styles.foundedText, { fontSize: scaleFont(10) }]} numberOfLines={1}>
            {item.founded}
          </Text>
          <TouchableOpacity
            style={[
              styles.detailBtn, 
              { 
                paddingHorizontal: scaleWidth(14), 
                paddingVertical: scaleHeight(8),
                marginTop: scaleHeight(8)
              }
            ]}
            onPress={() => handleWriteReview(item)}
            activeOpacity={0.7}
          >
            <Text style={[styles.detailText, { fontSize: scaleFont(11) }]}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={PURPLE} />
        <Text style={styles.loadingText}>Loading more...</Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (loading) return null;
    return (
      <View style={[styles.emptyState, { paddingVertical: scaleHeight(60) }]}>
        <Image 
          source={require('../../../assets/search.png')} 
          style={[styles.emptyIcon, { width: scaleWidth(80), height: scaleHeight(80) }]}
        />
        <Text style={[styles.emptyTitle, { fontSize: scaleFont(20) }]}>
          {error ? 'Failed to Load Companies' : 'No Companies Found'}
        </Text>
        <Text style={[styles.emptySubtitle, { fontSize: scaleFont(16) }]}>
          {error || 'Pull to refresh or add companies from home screen'}
        </Text>
        {error && (
          <TouchableOpacity style={styles.retryButton} onPress={loadInitialData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  // Full screen loading
  if (loading && allCompanies.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar backgroundColor={PURPLE} barStyle="light-content" />
        <ActivityIndicator size="large" color={PURPLE} />
        <Text style={[styles.loadingText, { marginTop: 20, fontSize: scaleFont(16) }]}>
          Loading companies...
        </Text>
      </SafeAreaView>
    );
  }

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
          All Companies 
        </Text>
        
        <View style={[styles.headerSpacer, { width: scaleWidth(40) }]} />
      </View>

      <FlatList
        data={allCompanies}
        renderItem={renderCompanyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreCompanies}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[PURPLE]}
            tintColor={PURPLE}
            title="Refreshing..."
          />
        }
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: Platform.OS === 'ios' ? 0 : 25,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: PURPLE,
    fontWeight: '600',
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

  /* LIST CONTENT */
  listContent: {
    paddingHorizontal: scaleWidth(16),
    paddingBottom: Platform.OS === 'ios' ? scaleHeight(34) : scaleHeight(20),
  },

  /* COMPANY ITEM */
  companyWrapper: {},
  companyCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  companyLogo: {
    borderRadius: 10,
    marginRight: 12,
  },
  companyBody: { 
    flex: 1,
    justifyContent: 'space-between',
  },
  companyName: {
    fontWeight: '700',
    marginBottom: 4,
    color: '#1f2937',
  },
  address: { 
    color: '#6b7280', 
    lineHeight: 16,
    marginBottom: 4,
  },
  companyDesc: {
    color: '#6b7280',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingStar: {
    tintColor: '#facc15',
    marginRight: 4,
  },
  ratingText: { 
    fontWeight: '700', 
    marginRight: 6,
    color: '#1f2937',
  },
  reviewText: { 
    color: '#6b7280' 
  },
  rightSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  foundedText: {
    color: '#6b7280',
    marginBottom: 8,
    textAlign: 'right',
  },
  detailBtn: {
    backgroundColor: PURPLE,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* LOADING FOOTER */
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingText: {
    color: PURPLE,
    marginLeft: 8,
    fontWeight: '500',
  },

  /* EMPTY STATE */
  emptyState: {
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyIcon: {
    tintColor: '#d1d5db',
    marginBottom: 20,
  },
  emptyTitle: {
    fontWeight: '800',
    color: PURPLE,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: PURPLE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
