import React from 'react';
import { Button, View } from 'react-native';
import { SearchInput } from '../atoms'
import { ButtonRefresh } from '../../utils/styles'

const SearchHeader = ({ search, onChange, onRefresh }: any) => {
    return (
        <View>
            <SearchInput search={search} onChange={onChange} />
            <ButtonRefresh>
                <Button title="refresh" onPress={onRefresh} />
            </ButtonRefresh>
        </View>
    )
}
export { SearchHeader }
