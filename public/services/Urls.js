const Urls = {
	MainUrl: '/',
	LoginUrl: '/login',
	SignupUrl: '/signup',
	ProfileUrl: '/profile',
	CollectionsUrl: '/collections',
	ALbumsUrl: '/albums',
	ArtistsUrl: '/artists',
	SearchUrl: '/search',
	FavouritesUrl: '/favourites',
	PlaylistsUrl: '/playlists',
	Followers: '/followers',
	Following: '/following',
	FeedUrl: '/feed',

	//WithId
	CollectionUrl: '/collection/:id',
	AlbumURl: '/album/:id',
	ArtistUrl: '/artist/:id',
	PlaylistUrl: '/playlist/:id',
	FriendUrl: '/user/:id',

	//Admin
	AdminArtists: '/artist-list',
	AdminAlbums: '/album-list',
	AdminTracks: '/track-list',
	AdminCollections: '/collection-list',

	AdminGenreEditor: '/genre-editor/:id',
	AdminArtistEditor: '/artist-editor/:id',
	AdminAlbumEdtior: '/album-editor/:id',
	AdminTrackEditor: '/track-editor/:id',
	AdminCollectionEditor: '/collection-editor/:id'
};

export default Urls;
