import Styled from 'styled-components'
import { Input, Button } from '@mui/material'

const SearchBar = (props) => {
    const {search, onChangeSearch, searchSubmit} = props

    return (
        <>
            <Search>
                <SearchInner>
                    <SearchBox>
                        <Input placeholder="상품 검색" value={search} onChange={onChangeSearch}/>
                    </SearchBox>
                    <SearchBox>
                        <Button variant="outlined" onClick={searchSubmit}>검색</Button>
                    </SearchBox>
                </SearchInner>
            </Search>
        </>
    )
}

export default SearchBar

const Search = Styled.li`
    float:right;
`

const SearchInner = Styled.div`
    display : flex;
    gap : 10px;

    @media screen and (max-width : 1095px) {
    
    }
`

const SearchBox = Styled.div`
    & > button {
        line-height: 1.5;
    }
`