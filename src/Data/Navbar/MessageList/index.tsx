interface MessageListType {
    name: string;
    message: string;
    time: string;
    isOnline: "success" | "warning" | "dark";
    profileURL: string;
}

const MessageList: MessageListType[] = [
    {
        name: "Melissa Ayre",
        message: "Re: New Security Codes. Hello again and thanks for being part of our amazing community.",
        time: "56 seconds ago",
        isOnline: "success",
        profileURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqSdStWAtFfqu7ZUGwOXD4wGJZA1z8vb-WLWw1FwhGo_b-xXWM3B-J01wdL9zwUBbsAI&usqp=CAU"
    },
    {
        name: "Adison Lee",
        message: "What are you doing right now.",
        time: "2 minutes ago",
        isOnline: "warning",
        profileURL: "https://media.istockphoto.com/id/480286744/photo/portrait-of-a-german-businessman-with-beard.jpg?s=612x612&w=0&k=20&c=PAi9oWMV2LLkbPM14nvpWOAZUk_kb6DXvpQ4ZwyJvjs="
    },
    {
        name: "MM Alam",
        message: "Hey our plan has destroyed 5 pans in just a second.",
        time: "1 second ago",
        isOnline: "dark",
        profileURL: "https://i.pinimg.com/originals/c3/33/27/c333273fcfc3198e93df380c0cfc0437.jpg"
    },
    {
        name: "Major Aziz Bhatti",
        message: "I have made the strategy of india to be failed and have given my life for it.",
        time: "46 years ago",
        isOnline: "warning",
        profileURL: "https://t3.ftcdn.net/jpg/03/31/63/82/360_F_331638217_BsSy1TcziNymxOBAMGO6Zrc4hge5yQWz.jpg"
    },
    {
        name: "Melissa Ayre",
        message: "Re: New Security Codes. Hello again and thanks for being part of our amazing community.",
        time: "56 seconds ago",
        isOnline: "success",
        profileURL: "https://visafoto.com/img/source355x388_ar.jpg"
    },
    {
        name: "Melissa Ayre",
        message: "Re: New Security Codes. Hello again and thanks for being part of our amazing community.",
        time: "56 seconds ago",
        isOnline: "success",
        profileURL: "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/2501/2020/12/Prof.-Alemayehu-Worku-e1607531245550.jpg"
    }
]
export default MessageList;