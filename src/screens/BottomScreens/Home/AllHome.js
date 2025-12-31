import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const PURPLE = '#211b47';

// Companies data
const companies = {
  'Indore': [
    {
      id: '1',
      name: 'Graffersid Web and App Development',
      address: '816, Shekhar Central, Manorama Ganj, AB Road, New Palasia, Indore (M.P.)',
      rating: 4.5,
      reviews: 41,
      founded: '01-01-2016',
      logo: require('../../../assets/splash.jpg'),
      description: 'Leading web and mobile app development company in Indore.',
      category: 'Web & App Development',
      employees: '50-100',
    },
    {
      id: '2',
      name: 'Code Tech Company',
      address: '414, Kanha Appartment, Bhawarkua, Indore (M.P.)',
      rating: 4.5,
      reviews: 28,
      founded: '01-01-2016',
      logo: require('../../../assets/s2.png'),
      description: 'Innovative software solutions for modern businesses.',
      category: 'Software Development',
      employees: '20-50',
    },
    {
      id: '3',
      name: 'Innogent Pvt. Ltd.',
      address: '910, Shekhar Central, Manorama Ganj, AB Road, New Palasia, Indore (M.P.)',
      rating: 4.5,
      reviews: 36,
      founded: '01-01-2016',
      logo: require('../../../assets/s3.png'),
      description: 'Enterprise software development and IT consulting.',
      category: 'IT Consulting',
      employees: '100-200',
    },
  ],
  'Bhopal': [
    {
      id: '4',
      name: 'Bhopal Tech Solutions',
      address: '123, MP Nagar, Zone-II, Bhopal (M.P.)',
      rating: 4.7,
      reviews: 52,
      founded: '15-03-2018',
      logo: require('../../../assets/splash.jpg'),
      description: 'Digital transformation services in Bhopal.',
      category: 'Digital Solutions',
      employees: '30-60',
    },
    {
      id: '5',
      name: 'Digital Bhopal Pvt Ltd',
      address: '456, Arera Colony, Bhopal (M.P.)',
      rating: 4.3,
      reviews: 29,
      founded: '20-06-2017',
      logo: require('../../../assets/s2.png'),
      description: 'Web development and digital marketing agency.',
      category: 'Digital Agency',
      employees: '15-30',
    },
  ],
  'Delhi': [
    {
      id: '6',
      name: 'Delhi Software House',
      address: '789, Nehru Place, New Delhi',
      rating: 4.6,
      reviews: 67,
      founded: '10-09-2015',
      logo: require('../../../assets/s3.png'),
      description: 'Full-stack development services in Delhi.',
      category: 'Software House',
      employees: '80-150',
    },
    {
      id: '7',
      name: 'Capital Coders',
      address: '321, Connaught Place, Delhi',
      rating: 4.4,
      reviews: 45,
      founded: '05-12-2019',
      logo: require('../../../assets/splash.jpg'),
      description: 'Agile software development team.',
      category: 'Software Development',
      employees: '25-50',
    },
    {
      id: '8',
      name: 'NCR Developers',
      address: '654, Okhla Industrial Area, Delhi',
      rating: 4.8,
      reviews: 73,
      founded: '22-01-2020',
      logo: require('../../../assets/s2.png'),
      description: 'Specialized in enterprise applications.',
      category: 'Enterprise Solutions',
      employees: '150-300',
    },
  ],
};

const sortOptions = ['Name', 'Rating', 'Reviews', 'Founded'];

export default function HomeScreen() {
  const navigation = useNavigation(); // Use navigation hook
  const [selectedCity, setSelectedCity] = useState('Indore, Madhya Pradesh, India');
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Name');
  const [currentCityCompanies, setCurrentCityCompanies] = useState(companies['Indore']);
  const [addCompanyModalVisible, setAddCompanyModalVisible] = useState(false);
  const [findCompanyModalVisible, setFindCompanyModalVisible] = useState(false);
  const [userCompanies, setUserCompanies] = useState([]);
  const [popup, setPopup] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Company Form State
  const [companyName, setCompanyName] = useState('');
  const [foundedYear, setFoundedYear] = useState('');
  const [address, setAddress] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [logoImage] = useState(require('../../../assets/splash.jpg'));

  const cities = [
    { label: 'All Cities', key: 'all' },
    { label: 'Indore, Madhya Pradesh, India', key: 'Indore' },
    { label: 'Bhopal, Madhya Pradesh, India', key: 'Bhopal' },
    { label: 'Delhi, NCT, India', key: 'Delhi' },
  ];

  // Load user companies on mount
  useEffect(() => {
    loadUserCompanies();
  }, []);

  const loadUserCompanies = async () => {
    try {
      const stored = await AsyncStorage.getItem('USER_COMPANIES');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUserCompanies(parsed);
        // Update current city companies with user companies
        const cityKey = cities.find(c => c.label === selectedCity)?.key;
        if (cityKey === 'all') {
          const allPredefined = Object.values(companies).flat();
          setCurrentCityCompanies([...allPredefined, ...parsed]);
        }
      }
    } catch (error) {
      console.log('Error loading companies:', error);
    }
  };

  const saveUserCompanies = async (companiesList) => {
    try {
      await AsyncStorage.setItem('USER_COMPANIES', JSON.stringify(companiesList));
    } catch (error) {
      console.log('Error saving companies:', error);
    }
  };

  const handleCitySelect = (city) => {
    const cityKey = cities.find(c => c.label === city)?.key;
    
    if (cityKey === 'all') {
      const allPredefined = Object.values(companies).flat();
      setCurrentCityCompanies([...allPredefined, ...userCompanies]);
    } else {
      const cityCompanies = companies[cityKey] || [];
      // Filter user companies by city
      const userCompaniesInCity = userCompanies.filter(company => 
        company.address.toLowerCase().includes(cityKey.toLowerCase())
      );
      setCurrentCityCompanies([...cityCompanies, ...userCompaniesInCity]);
    }
    
    setSelectedCity(city);
    setCityModalVisible(false);
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
    setSortModalVisible(false);
    
    const sortedCompanies = [...currentCityCompanies].sort((a, b) => {
      switch (sortOption) {
        case 'Rating':
          return b.rating - a.rating;
        case 'Reviews':
          return b.reviews - a.reviews;
        case 'Founded':
          try {
            const dateA = new Date(a.founded.split('-').reverse().join('-'));
            const dateB = new Date(b.founded.split('-').reverse().join('-'));
            return dateB.getTime() - dateA.getTime();
          } catch (e) {
            return 0;
          }
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setCurrentCityCompanies(sortedCompanies);
  };

  const validateAddCompany = () => {
    if (!companyName.trim()) {
      setPopup('Please enter company name');
      return false;
    }
    if (!foundedYear.trim()) {
      setPopup('Please enter founded year');
      return false;
    }
    if (!address.trim()) {
      setPopup('Please enter address');
      return false;
    }
    if (!rating.trim()) {
      setPopup('Please enter rating');
      return false;
    }
    const ratingNum = parseFloat(rating);
    if (isNaN(ratingNum) || ratingNum > 5 || ratingNum < 0) {
      setPopup('Rating must be between 0 and 5');
      return false;
    }
    return true;
  };

  const handleAddCompany = async () => {
    if (!validateAddCompany()) return;

    const newCompany = {
      id: `${Date.now()}`,
      name: companyName.trim(),
      address: address.trim(),
      rating: parseFloat(rating),
      reviews: 0,
      founded: foundedYear.trim(),
      logo: logoImage,
      description: description.trim(),
      category: 'User Added',
      employees: 'Not specified',
    };

    const updatedUserCompanies = [...userCompanies, newCompany];
    setUserCompanies(updatedUserCompanies);
    await saveUserCompanies(updatedUserCompanies);
    
    // Update current display if showing "All Cities"
    if (selectedCity === 'All Cities') {
      setCurrentCityCompanies(prev => [...prev, newCompany]);
    } else {
      // Check if the new company belongs to current city
      const cityKey = cities.find(c => c.label === selectedCity)?.key;
      if (cityKey && address.toLowerCase().includes(cityKey.toLowerCase())) {
        setCurrentCityCompanies(prev => [...prev, newCompany]);
      }
    }
    
    // Reset form
    setCompanyName('');
    setFoundedYear('');
    setAddress('');
    setRating('');
    setDescription('');
    setAddCompanyModalVisible(false);
    
    setPopup('Company added successfully!');
  };

  // Filter companies based on search query
  const filteredCompanies = currentCityCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Dynamic bottom padding for safe area
  const getBottomPadding = () => {
    if (Platform.OS === 'ios') {
      return scaleHeight(34);
    }
    return scaleHeight(20);
  };

  const handleNavigateToAllCompanies = () => {
    navigation.navigate('SeeAll', {
      companies: [...Object.values(companies).flat(), ...userCompanies]
    });
  };

  const handleNavigateToCompanyDetail = (company) => {
    navigation.navigate('CompanyDetailScreen', { company });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={PURPLE} barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getBottomPadding() + scaleHeight(40) }
        ]}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.starCircle}>
              <Image
                source={require('../../../assets/star.png')}
                style={styles.headerStar}
              />
            </View>
            <Text style={[styles.headerTitle, { fontSize: scaleFont(20) }]}>
              Review<Text style={{ color: '#7A1FFF' }}>&</Text>RATE
            </Text>
          </View>

          <View style={styles.searchBox}>
            <Image
              source={require('../../../assets/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search companies..."
              placeholderTextColor="#9ca3af"
              style={[styles.searchInput, { fontSize: scaleFont(13) }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.separator} />

        {/* FILTER CARD */}
        <View style={[
          styles.filterCard, 
          { padding: scaleWidth(14), margin: scaleWidth(14) }
        ]}>
          <Text style={[styles.label, { fontSize: scaleFont(11) }]}>Select City</Text>
          <TouchableOpacity 
            style={[
              styles.inputBox, 
              { padding: scaleWidth(12), marginBottom: scaleHeight(12) }
            ]} 
            onPress={() => setCityModalVisible(true)}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../../assets/location.png')}
              style={[
                styles.purpleIconSmall, 
                { width: scaleWidth(12), height: scaleWidth(8) }
              ]}
            />
            <Text style={[styles.inputText, { fontSize: scaleFont(13) }]}>
              {selectedCity.length > 25 ? selectedCity.substring(0, 25) + '...' : selectedCity}
            </Text>
            <Image
              source={require('../../../assets/dropdown.png')}
              style={[
                styles.purpleIconSmall, 
                { width: scaleWidth(12), height: scaleWidth(8) }
              ]}
            />
          </TouchableOpacity>

          <View style={[styles.btnRow, { gap: scaleWidth(10), marginTop: scaleHeight(12) }]}>
            <TouchableOpacity 
              style={[
                styles.primaryBtn, 
                { paddingVertical: scaleHeight(12) }
              ]}
              onPress={() => setFindCompanyModalVisible(true)}
            >
              <Text style={[styles.btnText, { fontSize: scaleFont(13) }]}>Find Company</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.primaryBtn, 
                { paddingVertical: scaleHeight(12) }
              ]}
              onPress={() => setAddCompanyModalVisible(true)}
            >
              <Text style={[styles.btnText, { fontSize: scaleFont(13) }]}>+ Add Company</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { marginTop: scaleHeight(14), fontSize: scaleFont(11) }]}>
            Sort
          </Text>
          <TouchableOpacity 
            style={[
              styles.inputBox, 
              { padding: scaleWidth(12) }
            ]} 
            onPress={() => setSortModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.inputText, { fontSize: scaleFont(13) }]}>{selectedSort}</Text>
            <Image
              source={require('../../../assets/dropdown.png')}
              style={[
                styles.purpleIconSmall, 
                { width: scaleWidth(12), height: scaleWidth(8) }
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* COMPANY LIST */}
        <View style={[styles.listContainer, { paddingHorizontal: scaleWidth(16) }]}>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((item, index) => (
              <View key={item.id} style={[styles.companyWrapper, { marginBottom: scaleHeight(14) }]}>
                <View style={[
                  styles.companyCard, 
                  { padding: scaleWidth(14) }
                ]}>
                  <Image 
                    source={item.logo} 
                    style={[
                      styles.companyLogo, 
                      { width: scaleWidth(60), height: scaleHeight(60) }
                    ]} 
                  />

                  <View style={styles.companyBody}>
                    <Text style={[styles.companyName, { fontSize: scaleFont(15) }]}>
                      {item.name}
                    </Text>
                    <Text style={[styles.address, { fontSize: scaleFont(11) }]}>
                      {item.address.length > 40 ? item.address.substring(0, 40) + '...' : item.address}
                    </Text>

                    <View style={styles.ratingRow}>
                      <Image
                        source={require('../../../assets/star.png')}
                        style={[
                          styles.ratingStar, 
                          { width: scaleWidth(14), height: scaleHeight(14) }
                        ]}
                      />
                      <Text style={[styles.ratingText, { fontSize: scaleFont(13) }]}>
                        {item.rating.toFixed(1)}
                      </Text>
                      <Text style={[styles.reviewText, { fontSize: scaleFont(11) }]}>
                        {item.reviews} Reviews
                      </Text>
                    </View>
                    {item.description && (
                      <Text style={[styles.companyDesc, { fontSize: scaleFont(10) }]} numberOfLines={1}>
                        {item.description}
                      </Text>
                    )}
                  </View>

                  <View style={[styles.rightSection, { width: scaleWidth(90) }]}>
                    <Text style={[styles.foundedText, { fontSize: scaleFont(10) }]}>
                      Founded on {item.founded}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.detailBtn, 
                        { paddingHorizontal: scaleWidth(14), paddingVertical: scaleHeight(8) }
                      ]}
                      onPress={() => handleNavigateToCompanyDetail(item)}
                    >
                      <Text style={[styles.detailText, { fontSize: scaleFont(11) }]}>Detail Review</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={[styles.noResultsText, { fontSize: scaleFont(16) }]}>
                No companies found
              </Text>
              <Text style={[styles.noResultsSubtext, { fontSize: scaleFont(14) }]}>
                Try changing your search or filters
              </Text>
            </View>
          )}
          
          <View style={[
            styles.seeAllContainer, 
            { marginTop: scaleHeight(20), marginBottom: scaleHeight(50) }
          ]}>
            <TouchableOpacity
              onPress={handleNavigateToAllCompanies}
              style={[styles.seeAllButton, { paddingVertical: scaleHeight(12), paddingHorizontal: scaleWidth(24) }]}
            >
              <Text style={[styles.seeAllText, { fontSize: scaleFont(15) }]}>See All Companies →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* CITY MODAL */}
      <Modal
        visible={cityModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCityModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setCityModalVisible(false)}
        >
          <View style={[
            styles.modalContent, 
            { 
              padding: scaleWidth(20), 
              maxHeight: scaleHeight(300),
              width: screenWidth > 400 ? '85%' : '95%'
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontSize: scaleFont(17) }]}>Select City</Text>
              <TouchableOpacity 
                onPress={() => setCityModalVisible(false)}
                style={styles.closeButton}
              >
                <Image source={require('../../../assets/close.png')} style={[styles.closeIcon, { width: scaleWidth(20), height: scaleHeight(20) }]} />
              </TouchableOpacity>
            </View>
            {cities.map(city => (
              <TouchableOpacity
                key={city.key}
                style={[
                  styles.modalOption, 
                  { paddingVertical: scaleHeight(14), paddingHorizontal: scaleWidth(12) }
                ]}
                onPress={() => handleCitySelect(city.label)}
              >
                <Text style={[styles.modalOptionText, { fontSize: scaleFont(15) }]}>
                  {city.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* SORT MODAL */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setSortModalVisible(false)}
        >
          <View style={[
            styles.modalContent, 
            { 
              padding: scaleWidth(20), 
              maxHeight: scaleHeight(250),
              width: screenWidth > 400 ? '85%' : '95%'
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontSize: scaleFont(17) }]}>Sort By</Text>
              <TouchableOpacity 
                onPress={() => setSortModalVisible(false)}
                style={styles.closeButton}
              >
                <Image source={require('../../../assets/close.png')} style={[styles.closeIcon, { width: scaleWidth(20), height: scaleHeight(20) }]} />
              </TouchableOpacity>
            </View>
            {sortOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.modalOption, 
                  { paddingVertical: scaleHeight(14), paddingHorizontal: scaleWidth(12) }
                ]}
                onPress={() => handleSortSelect(option)}
              >
                <Text style={[styles.modalOptionText, { fontSize: scaleFont(15) }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ADD COMPANY MODAL */}
      <Modal
        visible={addCompanyModalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.addCompanyContainer}>
          <View style={[
            styles.addCompanyHeader, 
            { paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(16) }
          ]}>
            <TouchableOpacity 
              onPress={() => setAddCompanyModalVisible(false)}
              style={styles.backButton}
            >
              <Image source={require('../../../assets/back.png')} style={[styles.backIcon, { width: scaleWidth(24), height: scaleHeight(24) }]} />
            </TouchableOpacity>
            <Text style={[styles.addCompanyTitle, { fontSize: scaleFont(18) }]}>
              Add New Company
            </Text>
            <View style={{ width: scaleWidth(40) }} />
          </View>

          <ScrollView 
            style={styles.addCompanyScroll}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: getBottomPadding() + scaleHeight(120) }}
          >
            <View style={[
              styles.logoSection, 
              { marginTop: scaleHeight(24), marginBottom: scaleHeight(32) }
            ]}>
              <Text style={[styles.sectionTitle, { fontSize: scaleFont(15) }]}>Company Logo</Text>
              <View style={styles.logoPlaceholder}>
                <Image 
                  source={logoImage} 
                  style={[
                    styles.logoPreview, 
                    { width: scaleWidth(120), height: scaleHeight(120) }
                  ]}
                />
                <Text style={[styles.logoHint, { fontSize: scaleFont(11) }]}>Default logo used</Text>
              </View>
            </View>

            <View style={styles.formSection}>
              <Text style={[styles.sectionTitle, { fontSize: scaleFont(15) }]}>Company Details *</Text>
              
              <View style={[styles.formGroup, { marginBottom: scaleHeight(20) }]}>
                <Text style={[styles.formLabel, { fontSize: scaleFont(13) }]}>Company Name *</Text>
                <TextInput
                  style={[styles.formInput, { fontSize: scaleFont(15) }]}
                  value={companyName}
                  onChangeText={setCompanyName}
                  placeholder="Enter company name"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="words"
                />
              </View>

              <View style={[styles.formGroup, { marginBottom: scaleHeight(20) }]}>
                <Text style={[styles.formLabel, { fontSize: scaleFont(13) }]}>Founded Date *</Text>
                <TextInput
                  style={[styles.formInput, { fontSize: scaleFont(15) }]}
                  value={foundedYear}
                  onChangeText={setFoundedYear}
                  placeholder="MM-DD-YYYY"
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
              </View>

              <View style={[styles.formGroup, { marginBottom: scaleHeight(20) }]}>
                <Text style={[styles.formLabel, { fontSize: scaleFont(13) }]}>Full Address *</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea, { fontSize: scaleFont(15) }]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter complete address with city"
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View style={[styles.formGroup, { marginBottom: scaleHeight(20) }]}>
                <Text style={[styles.formLabel, { fontSize: scaleFont(13) }]}>Rating (0-5) *</Text>
                <TextInput
                  style={[styles.formInput, { fontSize: scaleFont(15) }]}
                  value={rating}
                  onChangeText={setRating}
                  placeholder="4.5"
                  placeholderTextColor="#9ca3af"
                  keyboardType="decimal-pad"
                  maxLength={4}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={[styles.formLabel, { fontSize: scaleFont(13) }]}>Description</Text>
                <TextInput
                  style={[styles.formInput, styles.textArea, { fontSize: scaleFont(15) }]}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Write about the company..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            style={[
              styles.saveButton, 
              { 
                marginBottom: getBottomPadding() + scaleHeight(20),
                padding: scaleHeight(20),
                marginHorizontal: scaleWidth(20)
              }
            ]} 
            onPress={handleAddCompany}
            activeOpacity={0.7}
          >
            <Text style={[styles.saveButtonText, { fontSize: scaleFont(16) }]}>Save Company</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* FIND COMPANY MODAL */}
      <Modal
        visible={findCompanyModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFindCompanyModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setFindCompanyModalVisible(false)}
        >
          <View style={[
            styles.modalContent, 
            { 
              width: screenWidth > 400 ? '90%' : '95%',
              padding: scaleWidth(20)
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { fontSize: scaleFont(17) }]}>Find Company</Text>
              <TouchableOpacity 
                onPress={() => setFindCompanyModalVisible(false)}
                style={styles.closeButton}
              >
                <Image source={require('../../../assets/close.png')} style={[styles.closeIcon, { width: scaleWidth(20), height: scaleHeight(20) }]} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.findCompanyContent}>
              <Text style={[styles.findCompanyText, { fontSize: scaleFont(16) }]}>
                🔍 Search across all cities for software companies
              </Text>
              <Text style={[styles.findCompanySubtext, { fontSize: scaleFont(13) }]}>
                Use the search bar above or filter by city to find companies near you.
              </Text>
              
              <View style={styles.findStats}>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { fontSize: scaleFont(22) }]}>25+</Text>
                  <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Companies</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { fontSize: scaleFont(22) }]}>4.6</Text>
                  <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Avg Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statNumber, { fontSize: scaleFont(22) }]}>331</Text>
                  <Text style={[styles.statLabel, { fontSize: scaleFont(11) }]}>Reviews</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={[
                  styles.exploreBtn, 
                  { paddingVertical: scaleHeight(16) }
                ]}
                onPress={() => {
                  setFindCompanyModalVisible(false);
                  handleNavigateToAllCompanies();
                }}
              >
                <Text style={[styles.exploreBtnText, { fontSize: scaleFont(15) }]}>Explore All Companies</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* POPUP MODAL */}
      <Modal transparent visible={popup.length > 0} animationType="fade">
        <View style={styles.popupBg}>
          <View style={[
            styles.popup, 
            { 
              padding: scaleWidth(28),
              width: screenWidth > 400 ? '85%' : '95%'
            }
          ]}>
            <Text style={[styles.popupText, { fontSize: scaleFont(15) }]}>{popup}</Text>
            <TouchableOpacity 
              onPress={() => setPopup('')}
              style={[
                styles.popupBtnContainer, 
                { 
                  paddingVertical: scaleHeight(12), 
                  paddingHorizontal: scaleWidth(24) 
                }
              ]}
            >
              <Text style={[styles.popupBtn, { fontSize: scaleFont(15) }]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: Platform.OS === 'ios' ? 0 : 25,
  },
  scrollContent: {
    paddingBottom: 30,
  },

  /* HEADER */
  header: {
    backgroundColor: '#ffffff',
    padding: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  starCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7A1FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  headerStar: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  headerTitle: {
    fontWeight: '800',
  },

  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f6',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 44,
  },
  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: '#7A1FFF',
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 8,
  },

  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },

  /* FILTER */
  filterCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
  },
  inputText: { 
    flex: 1, 
    marginLeft: 8,
  },
  purpleIconSmall: {
    tintColor: '#7A1FFF',
  },

  btnRow: {
    flexDirection: 'row',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: PURPLE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* LIST */
  listContainer: {},
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
    marginRight: 6 
  },
  reviewText: { color: '#6b7280' },

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

  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsSubtext: {
    color: '#9ca3af',
  },

  /* SEE ALL BUTTON */
  seeAllContainer: {
    alignItems: 'center',
  },
  seeAllButton: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  seeAllText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* MODALS */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontWeight: '700',
    color: PURPLE,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    tintColor: '#6b7280',
  },
  modalOption: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f6',
  },
  modalOptionText: {
    color: '#374151',
  },

  /* ADD COMPANY MODAL */
  addCompanyContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  addCompanyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    tintColor: PURPLE,
  },
  addCompanyTitle: {
    fontWeight: '700',
    color: PURPLE,
    marginLeft: 12,
    flex: 1,
    textAlign: 'center',
  },
  addCompanyScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '700',
    color: PURPLE,
    marginBottom: 12,
    textAlign: 'center',
  },
  logoPlaceholder: {
    alignItems: 'center',
  },
  logoPreview: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  logoHint: {
    color: '#6b7280',
    marginTop: 8,
  },
  formSection: {
    marginBottom: 20,
  },
  formGroup: {},
  formLabel: {
    fontWeight: '600',
    color: PURPLE,
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fafbfc',
    elevation: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 16,
  },
  saveButton: {
    backgroundColor: PURPLE,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* FIND COMPANY MODAL */
  findCompanyContent: {
    paddingVertical: 10,
  },
  findCompanyText: {
    fontWeight: '700',
    color: PURPLE,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 22,
  },
  findCompanySubtext: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  findStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: '800',
    color: PURPLE,
  },
  statLabel: {
    color: '#6b7280',
    marginTop: 4,
  },
  exploreBtn: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    alignItems: 'center',
  },
  exploreBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  /* POPUP */
  popupBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  popup: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  popupText: { 
    marginBottom: 20, 
    textAlign: 'center',
    lineHeight: 20,
  },
  popupBtnContainer: {
    backgroundColor: PURPLE,
    borderRadius: 12,
  },
  popupBtn: { 
    fontWeight: '700', 
    color: '#fff' 
  },
});