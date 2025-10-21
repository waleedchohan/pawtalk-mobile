import React from 'react';
import {Box, HStack, IconButton, Text, VStack} from 'native-base';
import SearchInput from '../SearchInput';
import MenuIcon from '../SvgIcons/Header/Menu';
import {useNavigation} from '@react-navigation/native';
import {useSearchState} from '../../Contexts/SearchState';

const SearchInputHeader = () => {
  const navigation = useNavigation();

  const {query, setQuery, search} = useSearchState();

  return (
    <Box safeAreaTop>
      <HStack>
        <IconButton
          icon={<MenuIcon />}
          onPress={() => navigation.openDrawer()}
          p={0}
          mx={2}
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

export default SearchInputHeader;
