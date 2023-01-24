interface NotificationsListTypes {
    title: string;
    message: string;
    time: string;
}

const NotificationsList: NotificationsListTypes[] = [
    {
        title: "New Assessment Created",
        message: "New Assessment named `Work on your home work` has been created ",
        time: "56 seconds ago"
    },
    {
        title: "User Added",
        message: "A User with a name Shabbir Hussain has been created",
        time: "2 minutes ago"
    },
    {
        title: "Course Created",
        message: "A course with the title Learning React JS has been created.",
        time: "1 second ago"
    },
    {
        title: "Event Created",
        message: "Your meeting with Muhammad Bilal has been established now.",
        time: "46 years ago"
    },
    {
        title: "New Message Received",
        message: "From Muhammad Ali: What are you doing right now?.",
        time: "56 seconds ago"
    },
    {
        title: "Melissa Ayre",
        message: "Re: New Security Codes. Hello again and thanks for being part of our amazing community.",
        time: "56 seconds ago"
    }
]
export default NotificationsList;