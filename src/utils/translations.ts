export type LanguageCode = "en" | "es" | "fr" | "de" | "hi";

export interface Translations {
  appName: string;
  tagline: string;
  searchPlaceholder: string;
  forYou: string;
  trending: string;
  favorites: string;
  analytics: string;
  settings: string;
  categories: string;
  sources: string;
  all: string;
  news: string;
  recommendations: string;
  social: string;
  density: string;
  compact: string;
  normal: string;
  visual: string;
  realtimeUpdates: string;
  newUpdatesAvailable: string;
  refreshNow: string;
  noContentFound: string;
  noFavoritesYet: string;
  readMore: string;
  playNow: string;
  viewPost: string;
  markFavorite: string;
  removeFavorite: string;
  dragToReorder: string;
  profile: string;
  saveChanges: string;
  darkMode: string;
  lightMode: string;
  clearAll: string;
  readingStats: string;
  totalSaved: string;
  topCategory: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appName: "PulseBoard",
    tagline: "Personalized Intelligence & Content Stream",
    searchPlaceholder: "Search news, movies, podcasts, and tweets...",
    forYou: "For You",
    trending: "Trending",
    favorites: "Favorites",
    analytics: "Insights",
    settings: "Settings",
    categories: "Categories",
    sources: "Sources",
    all: "All Feeds",
    news: "News",
    recommendations: "Recommendations",
    social: "Social Media",
    density: "Card Density",
    compact: "Compact",
    normal: "Standard",
    visual: "Visual",
    realtimeUpdates: "Live Stream",
    newUpdatesAvailable: "new updates waiting to be loaded",
    refreshNow: "Update Feed",
    noContentFound: "No content matches your filters or search query.",
    noFavoritesYet: "You haven't bookmarked any articles, movies, or posts yet.",
    readMore: "Read Story",
    playNow: "Play Media",
    viewPost: "View Post",
    markFavorite: "Save to Favorites",
    removeFavorite: "Remove Favorite",
    dragToReorder: "Drag to organize feed",
    profile: "User Profile",
    saveChanges: "Save Preferences",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    clearAll: "Clear Filter",
    readingStats: "Content Consumption Breakdown",
    totalSaved: "Items Saved",
    topCategory: "Primary Focus",
  },
  es: {
    appName: "PulseBoard",
    tagline: "Flujo de contenido e inteligencia personalizada",
    searchPlaceholder: "Buscar noticias, películas, podcasts y tweets...",
    forYou: "Para Ti",
    trending: "Tendencias",
    favorites: "Favoritos",
    analytics: "Estadísticas",
    settings: "Ajustes",
    categories: "Categorías",
    sources: "Fuentes",
    all: "Todo",
    news: "Noticias",
    recommendations: "Recomendaciones",
    social: "Redes Sociales",
    density: "Densidad",
    compact: "Compacto",
    normal: "Estándar",
    visual: "Visual",
    realtimeUpdates: "En Vivo",
    newUpdatesAvailable: "nuevas actualizaciones disponibles",
    refreshNow: "Actualizar",
    noContentFound: "No se encontró contenido con esos filtros.",
    noFavoritesYet: "Aún no has guardado ningún contenido favorito.",
    readMore: "Leer Artículo",
    playNow: "Reproducir",
    viewPost: "Ver Publicación",
    markFavorite: "Guardar en Favoritos",
    removeFavorite: "Quitar de Favoritos",
    dragToReorder: "Arrastrar para organizar",
    profile: "Perfil de Usuario",
    saveChanges: "Guardar Cambios",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    clearAll: "Limpiar Filtros",
    readingStats: "Resumen de Consumo de Contenido",
    totalSaved: "Guardados",
    topCategory: "Categoría Principal",
  },
  fr: {
    appName: "PulseBoard",
    tagline: "Flux de contenu personnalisé et intelligent",
    searchPlaceholder: "Rechercher des actualités, films, podcasts...",
    forYou: "Pour Vous",
    trending: "Tendances",
    favorites: "Favoris",
    analytics: "Statistiques",
    settings: "Paramètres",
    categories: "Catégories",
    sources: "Sources",
    all: "Tous",
    news: "Actualités",
    recommendations: "Recommandations",
    social: "Réseaux Sociaux",
    density: "Densité",
    compact: "Compact",
    normal: "Standard",
    visual: "Visuel",
    realtimeUpdates: "Direct",
    newUpdatesAvailable: "nouvelles mises à jour prêtes",
    refreshNow: "Actualiser",
    noContentFound: "Aucun contenu ne correspond à votre recherche.",
    noFavoritesYet: "Vous n'avez pas encore de favoris enregistrés.",
    readMore: "Lire l'Article",
    playNow: "Écouter / Voir",
    viewPost: "Voir le Post",
    markFavorite: "Ajouter aux favoris",
    removeFavorite: "Retirer des favoris",
    dragToReorder: "Glisser pour réorganiser",
    profile: "Profil Utilisateur",
    saveChanges: "Enregistrer",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    clearAll: "Effacer les filtres",
    readingStats: "Répartition du contenu consulté",
    totalSaved: "Articles Sauvegardés",
    topCategory: "Catégorie Principale",
  },
  de: {
    appName: "PulseBoard",
    tagline: "Personalisierter Content- und Informations-Feed",
    searchPlaceholder: "Nachrichten, Filme, Podcasts und Tweets suchen...",
    forYou: "Für Dich",
    trending: "Trending",
    favorites: "Favoriten",
    analytics: "Einblicke",
    settings: "Einstellungen",
    categories: "Kategorien",
    sources: "Quellen",
    all: "Alle Feeds",
    news: "Nachrichten",
    recommendations: "Empfehlungen",
    social: "Social Media",
    density: "Karten-Dichte",
    compact: "Kompakt",
    normal: "Standard",
    visual: "Visuell",
    realtimeUpdates: "Live-Stream",
    newUpdatesAvailable: "neue Beiträge verfügbar",
    refreshNow: "Aktualisieren",
    noContentFound: "Keine Inhalte für die Suche gefunden.",
    noFavoritesYet: "Noch keine Favoriten gespeichert.",
    readMore: "Weiterlesen",
    playNow: "Abspielen",
    viewPost: "Beitrag ansehen",
    markFavorite: "Zu Favoriten hinzufügen",
    removeFavorite: "Aus Favoriten entfernen",
    dragToReorder: "Ziehen zum Sortieren",
    profile: "Benutzerprofil",
    saveChanges: "Speichern",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    clearAll: "Filter löschen",
    readingStats: "Übersicht des Inhaltskonsums",
    totalSaved: "Gespeichert",
    topCategory: "Top-Kategorie",
  },
  hi: {
    appName: "PulseBoard",
    tagline: "व्यक्तिगत सामग्री और समाचार डैशबोर्ड",
    searchPlaceholder: "समाचार, फ़िल्में, पॉडकास्ट और ट्वीट्स खोजें...",
    forYou: "आपके लिए",
    trending: "ट्रेंडिंग",
    favorites: "पसंदीदा",
    analytics: "एनालिटिक्स",
    settings: "सेटिंग्स",
    categories: "श्रेणियां",
    sources: "स्रोत",
    all: "सभी फ़ीड",
    news: "समाचार",
    recommendations: "सिफारिशें",
    social: "सोशल मीडिया",
    density: "कार्ड का आकार",
    compact: "कॉम्पैक्ट",
    normal: "मानक",
    visual: "विज़ुअल",
    realtimeUpdates: "लाइव अपडेट",
    newUpdatesAvailable: "नए अपडेट लोड होने के लिए तैयार हैं",
    refreshNow: "फ़ीड रीफ़्रेश करें",
    noContentFound: "कोई सामग्री नहीं मिली।",
    noFavoritesYet: "आपने अभी तक कोई सामग्री सहेज नहीं रखी है।",
    readMore: "पूरी खबर पढ़ें",
    playNow: "प्ले करें",
    viewPost: "पोस्ट देखें",
    markFavorite: "पसंदीदा में जोड़ें",
    removeFavorite: "पसंदीदा से हटाएं",
    dragToReorder: "क्रम बदलने के लिए खींचें",
    profile: "प्रोफ़ाइल",
    saveChanges: "प्राथमिकताएं सहेजें",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    clearAll: "फ़िल्टर हटाएं",
    readingStats: "सामग्री उपभोग विश्लेषण",
    totalSaved: "सहेजे गए",
    topCategory: "मुख्य श्रेणी",
  },
};
