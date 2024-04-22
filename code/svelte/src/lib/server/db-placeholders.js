export let displayName = "Placeholder User";
export let username = "placeholder";
export let userId = 1;
export let website = "https://example.com";
export let contact = "contact@example.com";
export let bio = "This is a test user. They do not exist.";
export let location = "Chicago, IL";
export let joinDate = "2021-01-01";
export let photos = [
    {
        PhotoID: 0,
        Title: "Test Photo 1 really long n a m e a a a  aaa!!!",
        UUID: "placeholder.png",
        Description: "This is a test photo."
    }
];
export let albums = [
    {
        AlbumID: 0,
        Name: "Test Album 1",
        Description: "This is a test album 1.",
        Thumbnail: "placeholder.png",
        Count: 2
    }
];
export let posts = [
    {
        creator: {
            UserID: userId,
            DisplayName: displayName,
            Username: username
        },
        photo: photos[0]
    }
]
