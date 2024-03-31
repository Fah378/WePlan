import React, { useContext, useState, useEffect } from 'react';
import { StatusBar, FlatList, Text } from 'react-native';
import { InnerContainer, 
    StyledFormArea, 
    SubTitle
 } from '../components/styles';
import { CredentialsContext } from '../components/CredentialsContext';

const Wishlist = ({ navigation }) => {
    const { storedCredentials } = useContext(CredentialsContext);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch(`http://172.20.10.3:3000/wishlist/see-wishlist/${storedCredentials._id}`);
                const data = await response.json();
                if (response.ok) {
                    setWishlist(data.wishlist);
                } else {
                    console.error('Failed to fetch wishlist:', data.error);
                }
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };

        if (storedCredentials && storedCredentials._id) {
            fetchWishlist();
        }
    }, [storedCredentials]);

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <StyledFormArea>
                <FlatList
                    data={wishlist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <SubTitle>{item.locationName}</SubTitle>}
                />
                </StyledFormArea>
            </InnerContainer>
        </>
    );
};

export default Wishlist;