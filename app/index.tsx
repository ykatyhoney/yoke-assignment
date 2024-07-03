import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Button,
    Checkbox,
    ProgressBar,
    Text,
    TextInput,
} from "react-native-paper";

interface Contact {
    name: string;
    firstName: string;
    lastName: string;
    number: string;
    digits: string;
    id: number;
}

const PRIMARY_COLOR = "#0066b2";

const Contact = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

    const init = async () => {
        try {
            const { data } = await axios.get(
                process.env.EXPO_PUBLIC_API_URL || ""
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
            <Button
                mode="text"
                style={{ alignSelf: "flex-end" }}
                textColor={PRIMARY_COLOR}
            >
                Help
            </Button>

            <ProgressBar
                progress={selectedContacts.length / 6}
                color={PRIMARY_COLOR}
            />
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

            <View style={styles.scrollable}>
                <View style={styles.count}>
                    <Text style={styles.countText}>
                        {selectedContacts.length}
                    </Text>
                </View>
                {selectedContacts.map((contact, key) => (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        key={key}
                        style={styles.chip}
                        onPress={() => toggleSelection(contact)}
                    >
                        <Image
                            source={{
                                uri: `https://picsum.photos/seed/picsum-${key}/200/300`,
                            }}
                            style={styles.avatar}
                        />
                        <Text
                            style={[
                                styles.name,
                                { fontSize: 12, marginTop: 5 },
                            ]}
                        >
                            {contact.name ||
                                `${contact.lastName || ""} ${
                                    contact.firstName || ""
                                }`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={{ paddingBottom: 50 }}>
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
                            status={
                                isSelected(contact) ? "checked" : "unchecked"
                            }
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Button
                buttonColor={PRIMARY_COLOR}
                textColor="#fff"
                style={styles.mainBtn}
                contentStyle={{ height: 50 }}
            >
                Continue
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    pageTitle: {
        fontWeight: 700,
        fontSize: 35,
        lineHeight: 50,
        marginTop: 10,
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
    scrollable: {
        flexDirection: "row",
        flexWrap: "nowrap",
        overflow: "scroll",
        gap: 10,
        marginBottom: 15,
        marginTop: 5,
    },
    count: {
        borderWidth: 4,
        borderRadius: 50,
        height: 50,
        width: 50,
        borderColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
    },
    countText: {
        fontSize: 20,
        fontWeight: 700,
        color: PRIMARY_COLOR,
    },
    chip: {
        flexDirection: "column",
        alignItems: "center",
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
    mainBtn: {
        position: "absolute",
        top: Dimensions.get("screen").height - 100,
        width: Dimensions.get("screen").width - 50,
        alignSelf: "center",
        borderRadius: 10,
    },
});

export default Contact;
