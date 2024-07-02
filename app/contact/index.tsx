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
                "https://run.mocky.io/v3/2585c72f-6895-4e64-9433-45e6a95f0e39"
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
