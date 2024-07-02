import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

interface Contact {
    firstName: string;
    lastName: string;
    number: string;
}

const Contact = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    const init = async () => {
        try {
            const { data } = await axios.get(
                process.env.EXPO_PUBLIC_API_URL || ""
            );
            setContacts(data.contacts || []);
        } catch (err) {}
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput placeholder="Text" />
            <Text>contact</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
    },
});

export default Contact;
