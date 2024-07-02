import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkbox, ProgressBar, Text, TextInput } from "react-native-paper";

interface Contact {
    name: string;
    firstName: string;
    lastName: string;
    number: string;
    digits: string;
    id: number;
}

const Contact = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

    const init = async () => {
        try {
            const { data } = await axios.get(
                "https://run.mocky.io/v3/2585c72f-6895-4e64-9433-45e6a95f0e39"
            );
            setContacts(
                data.contacts.map((c: Contact, id: any) => ({ ...c, id })) || []
            );
        } catch (err) {}
    };

    const isSelected = (contact: Contact) => {
        return Boolean(selectedContacts.find(({ id }) => contact.id == id));
    };

    const toggleSelection = (contact: Contact) => {
        if (isSelected(contact)) {
            setSelectedContacts(
                selectedContacts.filter(({ id }) => id !== contact.id)
            );
        } else {
            setSelectedContacts([...selectedContacts, contact]);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <View style={styles.container}>
            <ProgressBar progress={selectedContacts.length / 6} />

            <Text style={styles.pageTitle}>Select 6+ supporters</Text>

            <Text style={styles.pageSubtitle}>
                Invite your biggest fans. Grandparents, aunts, uncles, and
                friends are common supporters. We'll send an invite for you.
            </Text>

            <TextInput
                style={styles.search}
                placeholder="Search supporters"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
            />

            {contacts.map((contact, key) => (
                <TouchableOpacity
                    activeOpacity={0.5}
                    key={key}
                    style={styles.contact}
                    onPress={() => toggleSelection(contact)}
                >
                    <Image
                        source={{
                            uri: `https://picsum.photos/seed/picsum-${key}/200/300`,
                        }}
                        style={styles.avatar}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.name}>
                            {contact.name ||
                                `${contact.lastName || ""} ${
                                    contact.firstName || ""
                                }`}
                        </Text>
                        <Text style={styles.number}>
                            {contact.number || contact.digits}
                        </Text>
                    </View>
                    <Checkbox.Android
                        status={isSelected(contact) ? "checked" : "unchecked"}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 15,
    },
    pageTitle: {
        fontWeight: 700,
        fontSize: 35,
        lineHeight: 50,
    },
    pageSubtitle: {
        lineHeight: 20,
    },
    search: {
        backgroundColor: "#ddd",
        padding: 0,
        height: 40,
        borderRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginTop: 20,
        marginBottom: 10,
    },
    contact: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
        paddingHorizontal: 5,
        gap: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    name: {
        fontWeight: 600,
        fontSize: 16,
        marginBottom: 3,
    },
    number: {
        color: "rgba(0,0,0, 0.5)",
    },
});

export default Contact;
