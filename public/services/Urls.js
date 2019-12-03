const Urls = {
	MainUrl: '/',
	LoginUrl: '/login',
	SignupUrl: '/signup',
	ProfileUrl: '/profile',
	CollectionsUrl: '/collections',
	GenresUrl: '/genres',
	ALbumsUrl: '/albums',
	ArtistsUrl: '/artists',
	SearchUrl: '/search',
	HistoryUrl: '/history',
	FavouritesUrl: '/favourites',
	PlaylistsUrl: '/playlists',
	FriendsUrl: '/friends',
	FeedUrl: '/feed',

	//WithId
	CollectionUrl: '/collection/:id',
	GenreUrl: '/genre/:id',
	AlbumURl: '/album/:id',
	ArtistUrl: '/artist/:id',
	PlaylistUrl: '/playlist/:id',
	FriendUrl: '/user/:id',

	//Admin
	AdminGenres: '/genre-list',
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
