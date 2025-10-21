import React, {useCallback} from 'react';
import {Box, HStack, IconButton} from 'native-base';
import SearchInput from '../SearchInput';
import {useNavigation} from '@react-navigation/native';
import BackArrowIcon from '../SvgIcons/BackArrow';
import {useSearchState} from '../../Contexts/SearchState';

const SearchInputHeaderWithBackBtn = ({clearQueryOnBack = false}) => {
  const navigation = useNavigation();

  const {query, setQuery, search} = useSearchState();

  const handleBack = useCallback(() => {
    if (clearQueryOnBack) {
      setQuery('');
    }

    navigation.goBack();
  }, [navigation, clearQueryOnBack, setQuery]);

  return (
    <Box safeAreaTop p={2}>
      <HStack>
        <IconButton
          icon={<BackArrowIcon />}
          onPress={handleBack}
          p={0}
          mx={2}
          alignSelf={'center'}
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 40,
          }}
        />

        <SearchInput
          value={query}
          onChangeText={setQuery}
          onSearch={search}
          placeholder="Search any recipe."
        />
      </HStack>
    </Box>
  );
};

export default SearchInputHeaderWithBackBtn;
