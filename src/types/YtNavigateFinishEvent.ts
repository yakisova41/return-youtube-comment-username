export interface YtNavigateFinishEvent {
  endpoint: WelcomeEndpoint;
  pageType: string;
  fromHistory: boolean;
  response: WelcomeResponse;
  navigationDoneMs: number;
}

export interface WelcomeEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint: WatchEndpoint;
}

export interface EndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  url: string;
  webPageType: WebPageType;
  rootVe: number;
  apiUrl?: APIURL;
}

export enum APIURL {
  YoutubeiV1Browse = "/youtubei/v1/browse",
}

export enum WebPageType {
  WebPageTypeBrowse = "WEB_PAGE_TYPE_BROWSE",
  WebPageTypeChannel = "WEB_PAGE_TYPE_CHANNEL",
  WebPageTypeSearch = "WEB_PAGE_TYPE_SEARCH",
  WebPageTypeUnknown = "WEB_PAGE_TYPE_UNKNOWN",
  WebPageTypeWatch = "WEB_PAGE_TYPE_WATCH",
}

export interface WatchEndpoint {
  videoId: string;
}

export interface WelcomeResponse {
  page: string;
  endpoint: WelcomeEndpoint;
  response: ResponseResponse;
  playerResponse: PlayerResponse;
  url: string;
}

export interface PlayerResponse {
  responseContext: PlayerResponseResponseContext;
  playabilityStatus: PlayabilityStatus;
  streamingData: StreamingData;
  heartbeatParams: HeartbeatParams;
  playbackTracking: PlaybackTracking;
  captions: Captions;
  videoDetails: PlayerResponseVideoDetails;
  playerConfig: PlayerConfig;
  storyboards: Storyboards;
  microformat: Microformat;
  cards: Cards;
  trackingParams: string;
  attestation: Attestation;
  frameworkUpdates: PlayerResponseFrameworkUpdates;
}

export interface Attestation {
  playerAttestationRenderer: PlayerAttestationRenderer;
}

export interface PlayerAttestationRenderer {
  challenge: string;
  botguardData: BotguardData;
}

export interface BotguardData {
  program: string;
  interpreterSafeUrl: InterpreterSafeURL;
  serverEnvironment: number;
}

export interface InterpreterSafeURL {
  privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
}

export interface Captions {
  playerCaptionsTracklistRenderer: PlayerCaptionsTracklistRenderer;
}

export interface PlayerCaptionsTracklistRenderer {
  captionTracks: CaptionTrack[];
  audioTracks: AudioTrack[];
  translationLanguages: TranslationLanguage[];
  defaultAudioTrackIndex: number;
}

export interface AudioTrack {
  captionTrackIndices: number[];
}

export interface CaptionTrack {
  baseUrl: string;
  name: HeaderText;
  vssId: string;
  languageCode: string;
  kind: string;
  isTranslatable: boolean;
}

export interface HeaderText {
  simpleText: string;
}

export interface TranslationLanguage {
  languageCode: string;
  languageName: HeaderText;
}

export interface Cards {
  cardCollectionRenderer: CardCollectionRenderer;
}

export interface CardCollectionRenderer {
  cards: Card[];
  headerText: HeaderText;
  icon: CloseButton;
  closeButton: CloseButton;
  trackingParams: string;
  allowTeaserDismiss: boolean;
  logIconVisibilityUpdates: boolean;
}

export interface Card {
  cardRenderer: CardRenderer;
}

export interface CardRenderer {
  teaser: Teaser;
  cueRanges: CueRange[];
  trackingParams: string;
}

export interface CueRange {
  startCardActiveMs: string;
  endCardActiveMs: string;
  teaserDurationMs: string;
  iconAfterTeaserMs: string;
}

export interface Teaser {
  simpleCardTeaserRenderer: SimpleCardTeaserRenderer;
}

export interface SimpleCardTeaserRenderer {
  message: HeaderText;
  trackingParams: string;
  prominent: boolean;
  logVisibilityUpdates: boolean;
  onTapCommand: OnTapCommandClass;
}

export interface OnTapCommandClass {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction: ChangeEngagementPanelVisibilityAction;
}

export interface ChangeEngagementPanelVisibilityAction {
  targetId: string;
  visibility: VisibilityEnum;
}

export enum VisibilityEnum {
  EngagementPanelVisibilityExpanded = "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED",
  EngagementPanelVisibilityHidden = "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN",
}

export interface CloseButton {
  infoCardIconRenderer: InfoCardIconRenderer;
}

export interface InfoCardIconRenderer {
  trackingParams: string;
}

export interface PlayerResponseFrameworkUpdates {
  entityBatchUpdate: PurpleEntityBatchUpdate;
}

export interface PurpleEntityBatchUpdate {
  mutations: PurpleMutation[];
  timestamp: Timestamp;
}

export interface PurpleMutation {
  entityKey: string;
  type: string;
  payload: PurplePayload;
}

export interface PurplePayload {
  offlineabilityEntity: OfflineabilityEntity;
}

export interface OfflineabilityEntity {
  key: string;
  offlineabilityRenderer: string;
  addToOfflineButtonState: string;
  contentCheckOk: boolean;
  racyCheckOk: boolean;
  loggingDirectives: OfflineabilityEntityLoggingDirectives;
}

export interface OfflineabilityEntityLoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
  enableDisplayloggerExperiment: boolean;
}

export interface VisibilityClass {
  types: string;
}

export interface Timestamp {
  seconds: string;
  nanos: number;
}

export interface HeartbeatParams {
  heartbeatToken: string;
  intervalMilliseconds: string;
  maxRetries: string;
  drmSessionId: string;
  softFailOnError: boolean;
  heartbeatServerData: string;
}

export interface Microformat {
  playerMicroformatRenderer: PlayerMicroformatRenderer;
}

export interface PlayerMicroformatRenderer {
  thumbnail: BackgroundClass;
  embed: Embed;
  title: HeaderText;
  description: HeaderText;
  lengthSeconds: string;
  ownerProfileUrl: string;
  externalChannelId: string;
  isFamilySafe: boolean;
  availableCountries: string[];
  isUnlisted: boolean;
  hasYpcMetadata: boolean;
  viewCount: string;
  category: string;
  publishDate: Date;
  ownerChannelName: string;
  uploadDate: Date;
}

export interface Embed {
  iframeUrl: string;
  width: number;
  height: number;
}

export interface BackgroundClass {
  thumbnails: ThumbnailElement[];
}

export interface ThumbnailElement {
  url: string;
  width: number;
  height: number;
}

export interface PlayabilityStatus {
  status: string;
  playableInEmbed: boolean;
  offlineability: Offlineability;
  miniplayer: Miniplayer;
  contextParams: string;
}

export interface Miniplayer {
  miniplayerRenderer: MiniplayerRenderer;
}

export interface MiniplayerRenderer {
  playbackMode: string;
}

export interface Offlineability {
  offlineabilityRenderer: OfflineabilityRenderer;
}

export interface OfflineabilityRenderer {
  offlineable: boolean;
  formats: OfflineabilityRendererFormat[];
  clickTrackingParams: string;
}

export interface OfflineabilityRendererFormat {
  name: Subtitle;
  formatType: string;
}

export interface Subtitle {
  runs: SubtitleRun[];
}

export interface SubtitleRun {
  text: string;
}

export interface PlaybackTracking {
  videostatsPlaybackUrl: URL;
  videostatsDelayplayUrl: URL;
  videostatsWatchtimeUrl: URL;
  ptrackingUrl: URL;
  qoeUrl: URL;
  atrUrl: AtrURL;
  videostatsScheduledFlushWalltimeSeconds: number[];
  videostatsDefaultFlushIntervalSeconds: number;
}

export interface AtrURL {
  baseUrl: string;
  elapsedMediaTimeSeconds: number;
}

export interface URL {
  baseUrl: string;
}

export interface PlayerConfig {
  audioConfig: AudioConfig;
  streamSelectionConfig: StreamSelectionConfig;
  mediaCommonConfig: MediaCommonConfig;
  webPlayerConfig: WebPlayerConfig;
}

export interface AudioConfig {
  loudnessDb: number;
  perceptualLoudnessDb: number;
  enablePerFormatLoudness: boolean;
}

export interface MediaCommonConfig {
  dynamicReadaheadConfig: DynamicReadaheadConfig;
}

export interface DynamicReadaheadConfig {
  maxReadAheadMediaTimeMs: number;
  minReadAheadMediaTimeMs: number;
  readAheadGrowthRateMs: number;
}

export interface StreamSelectionConfig {
  maxBitrate: string;
}

export interface WebPlayerConfig {
  useCobaltTvosDash: boolean;
  webPlayerActionsPorting: WebPlayerActionsPorting;
}

export interface WebPlayerActionsPorting {
  getSharePanelCommand: GetSharePanelCommand;
  subscribeCommand: SubscribeCommand;
  unsubscribeCommand: UnsubscribeCommand;
  addToWatchLaterCommand: AddToWatchLaterCommand;
  removeFromWatchLaterCommand: RemoveFromWatchLaterCommand;
}

export interface AddToWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  playlistEditEndpoint?: AddToWatchLaterCommandPlaylistEditEndpoint;
  addToPlaylistServiceEndpoint?: WatchEndpoint;
}

export interface AddToWatchLaterCommandCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  sendPost: boolean;
  apiUrl?: string;
}

export interface AddToWatchLaterCommandPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions: PurpleAction[];
}

export interface PurpleAction {
  addedVideoId: string;
  action: MagentaAction;
}

export enum MagentaAction {
  ActionAddVideo = "ACTION_ADD_VIDEO",
}

export enum PlaylistID {
  Wl = "WL",
}

export interface GetSharePanelCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  webPlayerShareEntityServiceEndpoint: WebPlayerShareEntityServiceEndpoint;
}

export interface WebPlayerShareEntityServiceEndpoint {
  serializedShareEntity: string;
}

export interface RemoveFromWatchLaterCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  playlistEditEndpoint: RemoveFromWatchLaterCommandPlaylistEditEndpoint;
}

export interface RemoveFromWatchLaterCommandPlaylistEditEndpoint {
  playlistId: PlaylistID;
  actions: FluffyAction[];
}

export interface FluffyAction {
  action: FriskyAction;
  removedVideoId: string;
}

export enum FriskyAction {
  ActionRemoveVideoByVideoID = "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
}

export interface SubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  subscribeEndpoint: SubscribeEndpoint;
}

export interface SubscribeEndpoint {
  channelIds: string[];
  params: string;
}

export interface UnsubscribeCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  unsubscribeEndpoint: SubscribeEndpoint;
}

export interface PlayerResponseResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: MainAppWebResponseContext;
  webResponseContextExtensionData: PurpleWebResponseContextExtensionData;
}

export interface MainAppWebResponseContext {
  datasyncId: string;
  loggedOut: boolean;
  trackingParam: string;
}

export interface ServiceTrackingParam {
  service: string;
  params: Param[];
}

export interface Param {
  key: string;
  value: string;
}

export interface PurpleWebResponseContextExtensionData {
  hasDecorated: boolean;
}

export interface Storyboards {
  playerStoryboardSpecRenderer: PlayerStoryboardSpecRenderer;
}

export interface PlayerStoryboardSpecRenderer {
  spec: string;
  recommendedLevel: number;
}

export interface StreamingData {
  expiresInSeconds: string;
  formats: StreamingDataFormat[];
  adaptiveFormats: AdaptiveFormat[];
}

export interface AdaptiveFormat {
  itag: number;
  url: string;
  mimeType: string;
  bitrate: number;
  width?: number;
  height?: number;
  initRange: Range;
  indexRange: Range;
  lastModified: string;
  contentLength: string;
  quality: string;
  fps?: number;
  qualityLabel?: string;
  projectionType: ProjectionType;
  averageBitrate: number;
  approxDurationMs: string;
  colorInfo?: ColorInfo;
  highReplication?: boolean;
  audioQuality?: string;
  audioSampleRate?: string;
  audioChannels?: number;
  loudnessDb?: number;
}

export interface ColorInfo {
  primaries: string;
  transferCharacteristics: string;
  matrixCoefficients: string;
}

export interface Range {
  start: string;
  end: string;
}

export enum ProjectionType {
  Rectangular = "RECTANGULAR",
}

export interface StreamingDataFormat {
  itag: number;
  url: string;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  lastModified: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: ProjectionType;
  audioQuality: string;
  approxDurationMs: string;
  audioSampleRate: string;
  audioChannels: number;
}

export interface PlayerResponseVideoDetails {
  videoId: string;
  title: string;
  lengthSeconds: string;
  keywords: string[];
  channelId: string;
  isOwnerViewing: boolean;
  shortDescription: string;
  isCrawlable: boolean;
  thumbnail: BackgroundClass;
  allowRatings: boolean;
  viewCount: string;
  author: string;
  isPrivate: boolean;
  isUnpluggedCorpus: boolean;
  isLiveContent: boolean;
}

export interface ResponseResponse {
  responseContext: ResponseResponseContext;
  contents: Contents;
  currentVideoEndpoint: CurrentVideoEndpointClass;
  trackingParams: string;
  playerOverlays: PlayerOverlays;
  onResponseReceivedEndpoints: OnResponseReceivedEndpoint[];
  engagementPanels: EngagementPanel[];
  topbar: Topbar;
  pageVisualEffects: PageVisualEffect[];
  frameworkUpdates: ResponseFrameworkUpdates;
}

export interface Contents {
  twoColumnWatchNextResults: TwoColumnWatchNextResults;
}

export interface TwoColumnWatchNextResults {
  results: TwoColumnWatchNextResultsResults;
  secondaryResults: TwoColumnWatchNextResultsSecondaryResults;
  autoplay: TwoColumnWatchNextResultsAutoplay;
}

export interface TwoColumnWatchNextResultsAutoplay {
  autoplay: AutoplayAutoplay;
}

export interface AutoplayAutoplay {
  sets: Set[];
  countDownSecs: number;
  trackingParams: string;
}

export interface Set {
  mode: string;
  autoplayVideo: NavigationEndpoint;
}

export interface NavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint: AutoplayVideoWatchEndpoint;
}

export interface AutoplayVideoWatchEndpoint {
  videoId: string;
  params: string;
  playerParams: string;
  watchEndpointSupportedPrefetchConfig: WatchEndpointSupportedPrefetchConfig;
}

export interface WatchEndpointSupportedPrefetchConfig {
  prefetchHintConfig: PrefetchHintConfig;
}

export interface PrefetchHintConfig {
  prefetchPriority: number;
  countdownUiRelativeSecondsPrefetchCondition: number;
}

export interface TwoColumnWatchNextResultsResults {
  results: ResultsResults;
}

export interface ResultsResults {
  contents: ResultsContent[];
  trackingParams: string;
}

export interface ResultsContent {
  videoPrimaryInfoRenderer?: VideoPrimaryInfoRenderer;
  videoSecondaryInfoRenderer?: VideoSecondaryInfoRenderer;
  itemSectionRenderer?: PurpleItemSectionRenderer;
}

export interface PurpleItemSectionRenderer {
  contents: PurpleContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId?: string;
}

export interface PurpleContent {
  commentsEntryPointHeaderRenderer?: CommentsEntryPointHeaderRenderer;
  continuationItemRenderer?: PurpleContinuationItemRenderer;
}

export interface CommentsEntryPointHeaderRenderer {
  headerText: Subtitle;
  onTap: ShowMoreCommand;
  trackingParams: string;
  commentCount: HeaderText;
  contentRenderer: ContentRenderer;
  targetId: string;
}

export interface ContentRenderer {
  commentsEntryPointTeaserRenderer: CommentsEntryPointTeaserRenderer;
}

export interface CommentsEntryPointTeaserRenderer {
  teaserAvatar: Avatar;
  teaserContent: HeaderText;
  trackingParams: string;
}

export interface Avatar {
  thumbnails: ThumbnailElement[];
  accessibility: DisabledAccessibilityData;
}

export interface DisabledAccessibilityData {
  accessibilityData: Accessibility;
}

export interface Accessibility {
  label: string;
}

export interface ShowMoreCommand {
  clickTrackingParams: string;
  commandExecutorCommand: ShowMoreCommandCommandExecutorCommand;
}

export interface ShowMoreCommandCommandExecutorCommand {
  commands: OnShowCommandElement[];
}

export interface OnShowCommandElement {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  scrollToEngagementPanelCommand?: ScrollToEngagementPanelCommandClass;
  showEngagementPanelScrimAction?: ShowEngagementPanelScrimAction;
}

export interface ScrollToEngagementPanelCommandClass {
  targetId: string;
}

export interface ShowEngagementPanelScrimAction {
  engagementPanelTargetId: string;
  onClickCommands: OnClickCommand[];
}

export interface OnClickCommand {
  clickTrackingParams: string;
  openPopupAction: OnClickCommandOpenPopupAction;
}

export interface OnClickCommandOpenPopupAction {
  popup: PurplePopup;
  popupType: PurplePopupType;
}

export interface PurplePopup {
  confirmDialogRenderer: PurpleConfirmDialogRenderer;
}

export interface PurpleConfirmDialogRenderer {
  title: HeaderText;
  trackingParams: string;
  dialogMessages: HeaderText[];
  confirmButton: PurpleButton;
  cancelButton: PurpleButton;
  primaryIsCancel: boolean;
}

export interface PurpleButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  style: string;
  size: Size;
  isDisabled: boolean;
  text: HeaderText;
  trackingParams: string;
  command?: PurpleCommand;
}

export interface PurpleCommand {
  clickTrackingParams: string;
  commandExecutorCommand?: PurpleCommandExecutorCommand;
  commandMetadata?: EndpointCommandMetadata;
  urlEndpoint?: URLEndpoint;
}

export interface PurpleCommandExecutorCommand {
  commands: FluffyCommand[];
}

export interface FluffyCommand {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  hideEngagementPanelScrimAction?: HideEngagementPanelScrimAction;
  loopCommand?: LoopCommand;
}

export interface HideEngagementPanelScrimAction {
  engagementPanelTargetId: string;
}

export interface LoopCommand {
  loop: boolean;
}

export interface URLEndpoint {
  url: string;
  target: Target;
}

export enum Target {
  TargetNewWindow = "TARGET_NEW_WINDOW",
}

export enum Size {
  SizeDefault = "SIZE_DEFAULT",
}

export enum PurplePopupType {
  Dialog = "DIALOG",
}

export interface PurpleContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: PurpleContinuationEndpoint;
}

export interface PurpleContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  continuationCommand: ContinuationEndpointContinuationCommand;
}

export interface ContinuationEndpointContinuationCommand {
  token: string;
  request: string;
}

export interface VideoPrimaryInfoRenderer {
  title: Subtitle;
  viewCount: ViewCount;
  videoActions: VideoActions;
  trackingParams: string;
  dateText: HeaderText;
  relativeDateText: ShortViewCountText;
}

export interface ShortViewCountText {
  accessibility: DisabledAccessibilityData;
  simpleText: string;
}

export interface VideoActions {
  menuRenderer: VideoActionsMenuRenderer;
}

export interface VideoActionsMenuRenderer {
  items: PurpleItem[];
  trackingParams: string;
  topLevelButtons: TopLevelButtonElement[];
  accessibility: DisabledAccessibilityData;
  flexibleItems: FlexibleItem[];
}

export interface FlexibleItem {
  menuFlexibleItemRenderer: MenuFlexibleItemRenderer;
}

export interface MenuFlexibleItemRenderer {
  menuItem: MenuItem;
  topLevelButton: MenuFlexibleItemRendererTopLevelButton;
}

export interface MenuItem {
  menuServiceItemDownloadRenderer?: MenuItemMenuServiceItemDownloadRenderer;
  menuServiceItemRenderer?: MenuItemMenuServiceItemRenderer;
}

export interface MenuItemMenuServiceItemDownloadRenderer {
  serviceEndpoint: MenuServiceItemDownloadRendererCommand;
  trackingParams: string;
}

export interface MenuServiceItemDownloadRendererCommand {
  clickTrackingParams: string;
  offlineVideoEndpoint: CommandOfflineVideoEndpoint;
}

export interface CommandOfflineVideoEndpoint {
  videoId: string;
  onAddCommand: PurpleOnAddCommand;
}

export interface PurpleOnAddCommand {
  clickTrackingParams: string;
  getDownloadActionCommand: PurpleGetDownloadActionCommand;
}

export interface PurpleGetDownloadActionCommand {
  videoId: string;
  params: string;
  offlineabilityEntityKey: string;
}

export interface MenuItemMenuServiceItemRenderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint: MenuServiceItemRendererCommandClass;
  trackingParams: string;
  isDisabled?: boolean;
}

export interface Icon {
  iconType: string;
}

export interface MenuServiceItemRendererCommandClass {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  addToPlaylistServiceEndpoint?: WatchEndpoint;
}

export interface MenuFlexibleItemRendererTopLevelButton {
  downloadButtonRenderer?: DownloadButtonRenderer;
  buttonRenderer?: FluffyButtonRenderer;
}

export interface FluffyButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: Size;
  isDisabled: boolean;
  text: Subtitle;
  icon: Icon;
  tooltip: string;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  targetId?: string;
  command: MenuServiceItemRendererCommandClass;
  accessibility?: Accessibility;
}

export enum DownloadButtonRendererStyle {
  StyleDefault = "STYLE_DEFAULT",
  StyleText = "STYLE_TEXT",
}

export interface DownloadButtonRenderer {
  trackingParams: string;
  style: DownloadButtonRendererStyle;
  size: Size;
  targetId: string;
  command: MenuServiceItemDownloadRendererCommand;
}

export interface PurpleItem {
  menuServiceItemRenderer: PurpleMenuServiceItemRenderer;
}

export interface PurpleMenuServiceItemRenderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint: PurpleServiceEndpoint;
  trackingParams: string;
}

export interface PurpleServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  getReportFormEndpoint?: GetTranscriptEndpointClass;
  signalServiceEndpoint?: PurpleSignalServiceEndpoint;
}

export interface GetTranscriptEndpointClass {
  params: string;
}

export interface PurpleSignalServiceEndpoint {
  signal: SignalEnum;
  actions: TentacledAction[];
}

export interface TentacledAction {
  clickTrackingParams: string;
  showEngagementPanelEndpoint: ShowEngagementPanelEndpoint;
}

export interface ShowEngagementPanelEndpoint {
  panelIdentifier: string;
}

export enum SignalEnum {
  ClientSignal = "CLIENT_SIGNAL",
}

export interface TopLevelButtonElement {
  segmentedLikeDislikeButtonRenderer?: SegmentedLikeDislikeButtonRenderer;
  buttonRenderer?: TentacledButtonRenderer;
}

export interface TentacledButtonRenderer {
  style: DownloadButtonRendererStyle;
  size: Size;
  isDisabled: boolean;
  text: Subtitle;
  serviceEndpoint: ServiceEndpointClass;
  icon: Icon;
  tooltip: string;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
}

export interface ServiceEndpointClass {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  shareEntityServiceEndpoint: ShareEntityServiceEndpoint;
}

export interface ShareEntityServiceEndpoint {
  serializedShareEntity: string;
  commands: ShareEntityServiceEndpointCommand[];
}

export interface ShareEntityServiceEndpointCommand {
  clickTrackingParams: string;
  openPopupAction: PurpleOpenPopupAction;
}

export interface PurpleOpenPopupAction {
  popup: FluffyPopup;
  popupType: PurplePopupType;
  beReused: boolean;
}

export interface FluffyPopup {
  unifiedSharePanelRenderer: UnifiedSharePanelRenderer;
}

export interface UnifiedSharePanelRenderer {
  trackingParams: string;
  showLoadingSpinner: boolean;
}

export interface SegmentedLikeDislikeButtonRenderer {
  likeButton: LikeButton;
  dislikeButton: DislikeButton;
  likeCount: string;
}

export interface DislikeButton {
  toggleButtonRenderer: DislikeButtonToggleButtonRenderer;
}

export interface DislikeButtonToggleButtonRenderer {
  style: StyleClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: PurpleDefaultServiceEndpoint;
  toggledServiceEndpoint: ToggledServiceEndpoint;
  accessibility: Accessibility;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: StyleClass;
  accessibilityData: DisabledAccessibilityData;
  toggleButtonSupportedData: ToggleButtonSupportedData;
  targetId: string;
}

export interface PurpleDefaultServiceEndpoint {
  clickTrackingParams: string;
  commandExecutorCommand: FluffyCommandExecutorCommand;
}

export interface FluffyCommandExecutorCommand {
  commands: TentacledCommand[];
}

export interface TentacledCommand {
  clickTrackingParams: string;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  likeEndpoint?: PurpleLikeEndpoint;
}

export interface PurpleLikeEndpoint {
  status: string;
  target: WatchEndpoint;
  dislikeParams: string;
}

export interface UpdateToggleButtonStateCommand {
  toggled: boolean;
  buttonId: string;
}

export interface StyleClass {
  styleType: string;
}

export interface ToggleButtonSupportedData {
  toggleButtonIdData: ToggleButtonIDData;
}

export interface ToggleButtonIDData {
  id: string;
}

export interface ToggledServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  likeEndpoint: ToggledServiceEndpointLikeEndpoint;
}

export interface ToggledServiceEndpointLikeEndpoint {
  status: string;
  target: WatchEndpoint;
  removeLikeParams: string;
}

export interface LikeButton {
  toggleButtonRenderer: LikeButtonToggleButtonRenderer;
}

export interface LikeButtonToggleButtonRenderer {
  style: StyleClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultText: ShortViewCountText;
  defaultServiceEndpoint: FluffyDefaultServiceEndpoint;
  toggledText: ShortViewCountText;
  toggledServiceEndpoint: ToggledServiceEndpoint;
  accessibility: Accessibility;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: StyleClass;
  accessibilityData: DisabledAccessibilityData;
  toggleButtonSupportedData: ToggleButtonSupportedData;
  targetId: string;
}

export interface FluffyDefaultServiceEndpoint {
  clickTrackingParams: string;
  commandExecutorCommand: TentacledCommandExecutorCommand;
}

export interface TentacledCommandExecutorCommand {
  commands: StickyCommand[];
}

export interface StickyCommand {
  clickTrackingParams: string;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  likeEndpoint?: FluffyLikeEndpoint;
}

export interface FluffyLikeEndpoint {
  status: string;
  target: WatchEndpoint;
  likeParams: string;
}

export interface ViewCount {
  videoViewCountRenderer: VideoViewCountRenderer;
}

export interface VideoViewCountRenderer {
  viewCount: HeaderText;
  shortViewCount: HeaderText;
}

export interface VideoSecondaryInfoRenderer {
  owner: Owner;
  subscribeButton: SubscribeButton;
  metadataRowContainer: MetadataRowContainer;
  showMoreText: HeaderText;
  showLessText: HeaderText;
  trackingParams: string;
  defaultExpanded: boolean;
  descriptionCollapsedLines: number;
  showMoreCommand: ShowMoreCommand;
  showLessCommand: OnTapCommandClass;
  attributedDescription: AttributedDescription;
}

export interface AttributedDescription {
  content: string;
  commandRuns: CommandRun[];
  styleRuns: StyleRun[];
  attachmentRuns: AttachmentRun[];
  decorationRuns: DecorationRun[];
}

export interface AttachmentRun {
  startIndex: number;
  length: number;
  element: Element;
  alignment: string;
}

export interface Element {
  type: Type;
  properties: Properties;
}

export interface Properties {
  layoutProperties: LayoutProperties;
}

export interface LayoutProperties {
  height: Height;
  width: Height;
}

export interface Height {
  value: number;
  unit: string;
}

export interface Type {
  imageType: ImageType;
}

export interface ImageType {
  image: Image;
}

export interface Image {
  sources: CommonConfig[];
}

export interface CommonConfig {
  url: string;
}

export interface CommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap;
  loggingDirectives?: CommandRunLoggingDirectives;
}

export interface CommandRunLoggingDirectives {
  trackingParams: string;
  enableDisplayloggerExperiment: boolean;
}

export interface OnTap {
  innertubeCommand: InnertubeCommand;
}

export interface InnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint?: InnertubeCommandWatchEndpoint;
  browseEndpoint?: InnertubeCommandBrowseEndpoint;
}

export interface InnertubeCommandBrowseEndpoint {
  browseId: string;
  params: string;
}

export interface InnertubeCommandWatchEndpoint {
  videoId: string;
  startTimeSeconds: number;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface DecorationRun {
  textDecorator: TextDecorator;
}

export interface TextDecorator {
  highlightTextDecorator: HighlightTextDecorator;
}

export interface HighlightTextDecorator {
  startIndex: number;
  length: number;
  backgroundColor: number;
  backgroundCornerRadius: number;
}

export interface StyleRun {
  startIndex: number;
  length: number;
  fontColor: number;
}

export interface MetadataRowContainer {
  metadataRowContainerRenderer: MetadataRowContainerRenderer;
}

export interface MetadataRowContainerRenderer {
  collapsedItemCount: number;
  trackingParams: string;
}

export interface Owner {
  videoOwnerRenderer: VideoOwnerRenderer;
}

export interface VideoOwnerRenderer {
  thumbnail: BackgroundClass;
  title: Byline;
  subscriptionButton: SubscriptionButton;
  navigationEndpoint: ChannelNavigationEndpointClass;
  subscriberCountText: ShortViewCountText;
  trackingParams: string;
}

export interface ChannelNavigationEndpointClass {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  browseEndpoint: NavigationEndpointBrowseEndpoint;
}

export interface NavigationEndpointBrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface SubscriptionButton {
  type: string;
  subscribed: boolean;
}

export interface Byline {
  runs: BylineRun[];
}

export interface BylineRun {
  text: string;
  navigationEndpoint: ChannelNavigationEndpointClass;
}

export interface SubscribeButton {
  subscribeButtonRenderer: SubscribeButtonRenderer;
}

export interface SubscribeButtonRenderer {
  buttonText: Subtitle;
  subscribed: boolean;
  enabled: boolean;
  type: string;
  channelId: string;
  showPreferences: boolean;
  subscribedButtonText: Subtitle;
  unsubscribedButtonText: Subtitle;
  trackingParams: string;
  unsubscribeButtonText: Subtitle;
  subscribeAccessibility: DisabledAccessibilityData;
  unsubscribeAccessibility: DisabledAccessibilityData;
  notificationPreferenceButton: NotificationPreferenceButton;
  targetId: string;
  subscribedEntityKey: string;
  onSubscribeEndpoints: SubscribeCommand[];
  onUnsubscribeEndpoints: OnUnsubscribeEndpoint[];
}

export interface NotificationPreferenceButton {
  subscriptionNotificationToggleButtonRenderer: SubscriptionNotificationToggleButtonRenderer;
}

export interface SubscriptionNotificationToggleButtonRenderer {
  states: State[];
  currentStateId: number;
  trackingParams: string;
  command: SubscriptionNotificationToggleButtonRendererCommand;
  targetId: string;
  secondaryIcon: Icon;
}

export interface SubscriptionNotificationToggleButtonRendererCommand {
  clickTrackingParams: string;
  commandExecutorCommand: StickyCommandExecutorCommand;
}

export interface StickyCommandExecutorCommand {
  commands: IndigoCommand[];
}

export interface IndigoCommand {
  clickTrackingParams: string;
  openPopupAction: FluffyOpenPopupAction;
}

export interface FluffyOpenPopupAction {
  popup: TentacledPopup;
  popupType: string;
}

export interface TentacledPopup {
  menuPopupRenderer: MenuPopupRenderer;
}

export interface MenuPopupRenderer {
  items: MenuPopupRendererItem[];
}

export interface MenuPopupRendererItem {
  menuServiceItemRenderer: FluffyMenuServiceItemRenderer;
}

export interface FluffyMenuServiceItemRenderer {
  text: Title;
  icon: Icon;
  serviceEndpoint: FluffyServiceEndpoint;
  trackingParams: string;
  isSelected?: boolean;
}

export interface FluffyServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  modifyChannelNotificationPreferenceEndpoint?: GetTranscriptEndpointClass;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface OnUnsubscribeEndpointSignalServiceEndpoint {
  signal: SignalEnum;
  actions: StickyAction[];
}

export interface StickyAction {
  clickTrackingParams: string;
  openPopupAction: TentacledOpenPopupAction;
}

export interface TentacledOpenPopupAction {
  popup: StickyPopup;
  popupType: PurplePopupType;
}

export interface StickyPopup {
  confirmDialogRenderer: FluffyConfirmDialogRenderer;
}

export interface FluffyConfirmDialogRenderer {
  trackingParams: string;
  dialogMessages: Subtitle[];
  confirmButton: A11YSkipNavigationButtonClass;
  cancelButton: A11YSkipNavigationButtonClass;
  primaryIsCancel: boolean;
}

export interface A11YSkipNavigationButtonClass {
  buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
}

export interface A11YSkipNavigationButtonButtonRenderer {
  style: string;
  size: Size;
  isDisabled: boolean;
  text?: Subtitle;
  accessibility?: Accessibility;
  trackingParams: string;
  serviceEndpoint?: UnsubscribeCommand;
  command?: IndecentCommand;
  icon?: Icon;
}

export interface IndecentCommand {
  clickTrackingParams: string;
  openPopupAction?: OnClickCommandOpenPopupAction;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  createBackstagePostEndpoint?: CreateBackstagePostEndpoint;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
}

export interface CreateBackstagePostEndpoint {
  createBackstagePostParams: string;
}

export interface CommandSignalServiceEndpoint {
  signal: SignalEnum;
  actions: IndigoAction[];
}

export interface IndigoAction {
  clickTrackingParams: string;
  signalAction: Signal;
}

export interface Signal {
  signal: string;
}

export interface Title {
  simpleText?: TitleSimpleText;
  runs?: SubtitleRun[];
}

export enum TitleSimpleText {
  すべて = "すべて",
  なし = "なし",
  カスタマイズされた通知のみ = "カスタマイズされた通知のみ",
  元に戻す = "元に戻す",
  概要 = "概要",
  詳細 = "詳細",
}

export interface State {
  stateId: number;
  nextStateId: number;
  state: VoiceSearchButton;
}

export interface VoiceSearchDialogRenderer {
  placeholderHeader: Subtitle;
  promptHeader: Subtitle;
  exampleQuery1: Subtitle;
  exampleQuery2: Subtitle;
  promptMicrophoneLabel: Subtitle;
  loadingHeader: Subtitle;
  connectionErrorHeader: Subtitle;
  connectionErrorMicrophoneLabel: Subtitle;
  permissionsHeader: Subtitle;
  permissionsSubtext: Subtitle;
  disabledHeader: Subtitle;
  disabledSubtext: Subtitle;
  microphoneButtonAriaLabel: Subtitle;
  exitButton: VoiceSearchButton;
  trackingParams: string;
  microphoneOffPromptHeader: Subtitle;
}

export interface IndigoPopup {
  voiceSearchDialogRenderer: VoiceSearchDialogRenderer;
}

export interface StickyOpenPopupAction {
  popup: IndigoPopup;
  popupType: string;
}

export interface IndecentAction {
  clickTrackingParams: string;
  openPopupAction: StickyOpenPopupAction;
}

export interface FluffySignalServiceEndpoint {
  signal: SignalEnum;
  actions: IndecentAction[];
}

export interface TentacledServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: FluffySignalServiceEndpoint;
}

export interface VoiceSearchButtonButtonRenderer {
  style?: DownloadButtonRendererStyle;
  size?: Size;
  isDisabled?: boolean;
  icon?: Icon;
  accessibility?: Accessibility;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  targetId?: string;
  command?: HilariousCommand;
  text?: HeaderText;
  navigationEndpoint?: CurrentVideoEndpointClass;
  serviceEndpoint?: TentacledServiceEndpoint;
  tooltip?: string;
}

export interface VoiceSearchButton {
  buttonRenderer: VoiceSearchButtonButtonRenderer;
}

export interface OnUnsubscribeEndpointCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  sendPost: boolean;
}

export interface HilariousCommand {
  clickTrackingParams: string;
  openPopupAction?: OnClickCommandOpenPopupAction;
  commandExecutorCommand?: IndigoCommandExecutorCommand;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  getSurveyCommand?: GetSurveyCommand;
}

export interface IndigoCommandExecutorCommand {
  commands: AmbitiousCommand[];
}

export interface AmbitiousCommand {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
}

export interface GetSurveyCommand {
  endpoint: GetSurveyCommandEndpoint;
  action: string;
}

export interface GetSurveyCommandEndpoint {
  watch: AdsEngagementPanelContentRenderer;
}

export interface AdsEngagementPanelContentRenderer {
  hack: boolean;
}

export interface CurrentVideoEndpointClass {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint: CurrentVideoEndpointWatchEndpoint;
}

export interface CurrentVideoEndpointWatchEndpoint {
  videoId: string;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
}

export interface OnUnsubscribeEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface TwoColumnWatchNextResultsSecondaryResults {
  secondaryResults: SecondaryResultsSecondaryResults;
}

export interface SecondaryResultsSecondaryResults {
  results: SecondaryResultsResult[];
  continuations: Continuation[];
  trackingParams: string;
}

export interface Continuation {
  nextContinuationData: NextContinuationData;
}

export interface NextContinuationData {
  continuation: string;
  clickTrackingParams: string;
  label: Subtitle;
}

export interface SecondaryResultsResult {
  compactVideoRenderer: CompactVideoRenderer;
}

export interface CompactVideoRenderer {
  videoId: string;
  thumbnail: BackgroundClass;
  title: ShortViewCountText;
  longBylineText: Byline;
  publishedTimeText: HeaderText;
  viewCountText: HeaderText;
  lengthText: ShortViewCountText;
  navigationEndpoint: CompactVideoRendererNavigationEndpoint;
  shortBylineText: Byline;
  channelThumbnail: BackgroundClass;
  trackingParams: string;
  shortViewCountText: ShortViewCountText;
  menu: CompactVideoRendererMenu;
  thumbnailOverlays: CompactVideoRendererThumbnailOverlay[];
  accessibility: DisabledAccessibilityData;
  richThumbnail?: RichThumbnail;
  badges?: Badge[];
  ownerBadges?: OwnerBadge[];
}

export interface Badge {
  metadataBadgeRenderer: BadgeMetadataBadgeRenderer;
}

export interface BadgeMetadataBadgeRenderer {
  style: string;
  label: string;
  trackingParams: string;
}

export interface CompactVideoRendererMenu {
  menuRenderer: PurpleMenuRenderer;
}

export interface PurpleMenuRenderer {
  items: FluffyItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  targetId?: string;
}

export interface FluffyItem {
  menuServiceItemRenderer?: TentacledMenuServiceItemRenderer;
  menuServiceItemDownloadRenderer?: ItemMenuServiceItemDownloadRenderer;
}

export interface ItemMenuServiceItemDownloadRenderer {
  serviceEndpoint: StickyServiceEndpoint;
  trackingParams: string;
}

export interface StickyServiceEndpoint {
  clickTrackingParams: string;
  offlineVideoEndpoint: PurpleOfflineVideoEndpoint;
}

export interface PurpleOfflineVideoEndpoint {
  videoId: string;
  onAddCommand: FluffyOnAddCommand;
}

export interface FluffyOnAddCommand {
  clickTrackingParams: string;
  getDownloadActionCommand: FluffyGetDownloadActionCommand;
}

export interface FluffyGetDownloadActionCommand {
  videoId: string;
  params: GetDownloadActionCommandParams;
}

export enum GetDownloadActionCommandParams {
  CAI3D = "CAI%3D",
}

export interface TentacledMenuServiceItemRenderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint: IndigoServiceEndpoint;
  trackingParams: string;
  hasSeparator?: boolean;
}

export interface IndigoServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  signalServiceEndpoint?: TentacledSignalServiceEndpoint;
  playlistEditEndpoint?: AddToWatchLaterCommandPlaylistEditEndpoint;
  addToPlaylistServiceEndpoint?: WatchEndpoint;
  shareEntityServiceEndpoint?: ShareEntityServiceEndpoint;
  feedbackEndpoint?: FeedbackEndpoint;
  getReportFormEndpoint?: GetTranscriptEndpointClass;
}

export interface FeedbackEndpoint {
  feedbackToken: string;
  uiActions: UIActions;
  actions: FeedbackEndpointAction[];
}

export interface FeedbackEndpointAction {
  clickTrackingParams: string;
  replaceEnclosingAction: ReplaceEnclosingAction;
}

export interface ReplaceEnclosingAction {
  item: ReplaceEnclosingActionItem;
}

export interface ReplaceEnclosingActionItem {
  notificationMultiActionRenderer: NotificationMultiActionRenderer;
}

export interface NotificationMultiActionRenderer {
  responseText: ResponseText;
  buttons: Button[];
  trackingParams: string;
  dismissalViewStyle: DismissalViewStyle;
}

export interface Button {
  buttonRenderer: ButtonButtonRenderer;
}

export interface ButtonButtonRenderer {
  style: PurpleStyle;
  text: Title;
  serviceEndpoint?: IndecentServiceEndpoint;
  trackingParams: string;
  command?: CunningCommand;
}

export interface CunningCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  urlEndpoint: URLEndpoint;
}

export interface IndecentServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  undoFeedbackEndpoint?: UndoFeedbackEndpoint;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
}

export interface UndoFeedbackEndpoint {
  undoToken: string;
  actions: UndoFeedbackEndpointAction[];
}

export interface UndoFeedbackEndpointAction {
  clickTrackingParams: string;
  undoFeedbackAction: AdsEngagementPanelContentRenderer;
}

export enum PurpleStyle {
  StyleBlueText = "STYLE_BLUE_TEXT",
}

export enum DismissalViewStyle {
  DismissalViewStyleCompactTall = "DISMISSAL_VIEW_STYLE_COMPACT_TALL",
}

export interface ResponseText {
  accessibility: DisabledAccessibilityData;
  simpleText?: ResponseTextSimpleText;
  runs?: SubtitleRun[];
}

export enum ResponseTextSimpleText {
  動画が削除されました = "動画が削除されました",
}

export interface UIActions {
  hideEnclosingContainer: boolean;
}

export interface TentacledSignalServiceEndpoint {
  signal: SignalEnum;
  actions: HilariousAction[];
}

export interface HilariousAction {
  clickTrackingParams: string;
  addToPlaylistCommand?: AddToPlaylistCommand;
  openPopupAction?: IndigoOpenPopupAction;
}

export interface AddToPlaylistCommand {
  openMiniplayer: boolean;
  openListPanel: boolean;
  videoId: string;
  listType: ListType;
  onCreateListCommand: OnCreateListCommand;
  videoIds: string[];
}

export enum ListType {
  PlaylistEditListTypeQueue = "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
}

export interface OnCreateListCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
}

export interface CreatePlaylistServiceEndpoint {
  videoIds: string[];
  params: CreatePlaylistServiceEndpointParams;
}

export enum CreatePlaylistServiceEndpointParams {
  CAQ3D = "CAQ%3D",
}

export interface IndigoOpenPopupAction {
  popup: IndecentPopup;
  popupType: FluffyPopupType;
}

export interface IndecentPopup {
  notificationActionRenderer: NotificationActionRenderer;
}

export interface NotificationActionRenderer {
  responseText: HeaderText;
  trackingParams: string;
}

export enum FluffyPopupType {
  Toast = "TOAST",
}

export interface CompactVideoRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint: PurpleWatchEndpoint;
}

export interface PurpleWatchEndpoint {
  videoId: string;
  nofollow: boolean;
  watchEndpointSupportedOnesieConfig: WatchEndpointSupportedOnesieConfig;
  params?: string;
  startTimeSeconds?: number;
}

export interface OwnerBadge {
  metadataBadgeRenderer: OwnerBadgeMetadataBadgeRenderer;
}

export interface OwnerBadgeMetadataBadgeRenderer {
  icon: Icon;
  style: string;
  tooltip: string;
  trackingParams: string;
  accessibilityData: Accessibility;
}

export interface RichThumbnail {
  movingThumbnailRenderer: MovingThumbnailRenderer;
}

export interface MovingThumbnailRenderer {
  movingThumbnailDetails?: MovingThumbnailDetails;
  enableHoveredLogging: boolean;
  enableOverlay: boolean;
}

export interface MovingThumbnailDetails {
  thumbnails: ThumbnailElement[];
  logAsMovingThumbnail: boolean;
}

export interface CompactVideoRendererThumbnailOverlay {
  thumbnailOverlayResumePlaybackRenderer?: ThumbnailOverlayResumePlaybackRenderer;
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayToggleButtonRenderer?: ThumbnailOverlayToggleButtonRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ThumbnailOverlayNowPlayingRenderer {
  text: Subtitle;
}

export interface ThumbnailOverlayResumePlaybackRenderer {
  percentDurationWatched: number;
}

export interface ThumbnailOverlayTimeStatusRenderer {
  text: ShortViewCountText;
  style: ThumbnailOverlayTimeStatusRendererStyle;
}

export enum ThumbnailOverlayTimeStatusRendererStyle {
  Default = "DEFAULT",
}

export interface ThumbnailOverlayToggleButtonRenderer {
  isToggled?: boolean;
  untoggledIcon: Icon;
  toggledIcon: Icon;
  untoggledTooltip: UntoggledTooltip;
  toggledTooltip: ToggledTooltip;
  untoggledServiceEndpoint: UntoggledServiceEndpoint;
  toggledServiceEndpoint?: RemoveFromWatchLaterCommand;
  untoggledAccessibility: DisabledAccessibilityData;
  toggledAccessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export enum ToggledTooltip {
  追加済み = "追加済み",
}

export interface UntoggledServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  playlistEditEndpoint?: AddToWatchLaterCommandPlaylistEditEndpoint;
  signalServiceEndpoint?: UntoggledServiceEndpointSignalServiceEndpoint;
}

export interface UntoggledServiceEndpointSignalServiceEndpoint {
  signal: SignalEnum;
  actions: AmbitiousAction[];
}

export interface AmbitiousAction {
  clickTrackingParams: string;
  addToPlaylistCommand: AddToPlaylistCommand;
}

export enum UntoggledTooltip {
  キューに追加 = "キューに追加",
  後で見る = "後で見る",
}

export interface EngagementPanel {
  engagementPanelSectionListRenderer: EngagementPanelSectionListRenderer;
}

export interface EngagementPanelSectionListRenderer {
  content: EngagementPanelSectionListRendererContent;
  targetId: string;
  visibility: VisibilityEnum;
  loggingDirectives: OfflineabilityEntityLoggingDirectives;
  panelIdentifier?: string;
  header?: Header;
  onShowCommands?: OnShowCommandElement[];
  veType?: number;
}

export interface EngagementPanelSectionListRendererContent {
  adsEngagementPanelContentRenderer?: AdsEngagementPanelContentRenderer;
  clipSectionRenderer?: ClipSectionRenderer;
  structuredDescriptionContentRenderer?: StructuredDescriptionContentRenderer;
  sectionListRenderer?: SectionListRenderer;
  continuationItemRenderer?: FluffyContinuationItemRenderer;
}

export interface ClipSectionRenderer {
  contents: ClipSectionRendererContent[];
}

export interface ClipSectionRendererContent {
  clipCreationRenderer: ClipCreationRenderer;
}

export interface ClipCreationRenderer {
  trackingParams: string;
  userAvatar: BackgroundClass;
  titleInput: TitleInput;
  scrubber: Scrubber;
  saveButton: A11YSkipNavigationButtonClass;
  displayName: HeaderText;
  publicityLabel: string;
  cancelButton: A11YSkipNavigationButtonClass;
  adStateOverlay: AdStateOverlay;
  externalVideoId: string;
  publicityLabelIcon: string;
}

export interface AdStateOverlay {
  clipAdStateRenderer: ClipAdStateRenderer;
}

export interface ClipAdStateRenderer {
  title: Subtitle;
  body: Subtitle;
}

export interface Scrubber {
  clipCreationScrubberRenderer: ClipCreationScrubberRenderer;
}

export interface ClipCreationScrubberRenderer {
  lengthTemplate: string;
  maxLengthMs: number;
  minLengthMs: number;
  defaultLengthMs: number;
  windowSizeMs: number;
  startAccessibility: DisabledAccessibilityData;
  endAccessibility: DisabledAccessibilityData;
  durationAccessibility: DisabledAccessibilityData;
}

export interface TitleInput {
  clipCreationTextInputRenderer: ClipCreationTextInputRenderer;
}

export interface ClipCreationTextInputRenderer {
  placeholderText: Subtitle;
  maxCharacterLimit: number;
}

export interface FluffyContinuationItemRenderer {
  trigger: string;
  continuationEndpoint: FluffyContinuationEndpoint;
}

export interface FluffyContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  getTranscriptEndpoint: GetTranscriptEndpointClass;
}

export interface SectionListRenderer {
  contents: SectionListRendererContent[];
  trackingParams: string;
}

export interface SectionListRendererContent {
  itemSectionRenderer: FluffyItemSectionRenderer;
}

export interface FluffyItemSectionRenderer {
  contents: FluffyContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: string;
}

export interface FluffyContent {
  continuationItemRenderer: PurpleContinuationItemRenderer;
}

export interface StructuredDescriptionContentRenderer {
  items: StructuredDescriptionContentRendererItem[];
}

export interface StructuredDescriptionContentRendererItem {
  videoDescriptionHeaderRenderer?: VideoDescriptionHeaderRenderer;
  expandableVideoDescriptionBodyRenderer?: ExpandableVideoDescriptionBodyRenderer;
  videoDescriptionInfocardsSectionRenderer?: VideoDescriptionInfocardsSectionRenderer;
}

export interface ExpandableVideoDescriptionBodyRenderer {
  showMoreText: HeaderText;
  showLessText: HeaderText;
  attributedDescriptionBodyText: AttributedDescription;
}

export interface VideoDescriptionHeaderRenderer {
  title: Subtitle;
  channel: HeaderText;
  views: HeaderText;
  publishDate: HeaderText;
  factoid: Factoid[];
  channelNavigationEndpoint: ChannelNavigationEndpointClass;
  channelThumbnail: Channel;
}

export interface Channel {
  thumbnails: CommonConfig[];
}

export interface Factoid {
  factoidRenderer: FactoidRenderer;
}

export interface FactoidRenderer {
  value: HeaderText;
  label: HeaderText;
  accessibilityText: string;
}

export interface VideoDescriptionInfocardsSectionRenderer {
  sectionTitle: HeaderText;
  creatorVideosButton: CreatorButton;
  creatorAboutButton: CreatorButton;
  sectionSubtitle: ShortViewCountText;
  channelAvatar: Channel;
  channelEndpoint: ChannelNavigationEndpointClass;
  trackingParams: string;
}

export interface CreatorButton {
  buttonRenderer: CreatorAboutButtonButtonRenderer;
}

export interface CreatorAboutButtonButtonRenderer {
  style: string;
  size: Size;
  isDisabled: boolean;
  text: HeaderText;
  icon: Icon;
  trackingParams: string;
  command: MagentaCommand;
}

export interface MagentaCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  browseEndpoint: InnertubeCommandBrowseEndpoint;
}

export interface Header {
  engagementPanelTitleHeaderRenderer: EngagementPanelTitleHeaderRenderer;
}

export interface EngagementPanelTitleHeaderRenderer {
  title: Title;
  informationButton?: VoiceSearchButton;
  visibilityButton: VoiceSearchButton;
  trackingParams: string;
  contextualInfo?: Subtitle;
  menu?: EngagementPanelTitleHeaderRendererMenu;
}

export interface EngagementPanelTitleHeaderRendererMenu {
  sortFilterSubMenuRenderer?: SortFilterSubMenuRenderer;
  menuRenderer?: FluffyMenuRenderer;
}

export interface FluffyMenuRenderer {
  items: TentacledItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface TentacledItem {
  menuServiceItemRenderer: StickyMenuServiceItemRenderer;
}

export interface StickyMenuServiceItemRenderer {
  text: Subtitle;
  serviceEndpoint: MenuServiceItemRendererCommand;
  trackingParams: string;
}

export interface MenuServiceItemRendererCommand {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: CommandSignalServiceEndpoint;
}

export interface SortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  icon: Icon;
  accessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export interface SubMenuItem {
  title: string;
  selected: boolean;
  serviceEndpoint: SubMenuItemServiceEndpoint;
  trackingParams: string;
}

export interface SubMenuItemServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  continuationCommand: ServiceEndpointContinuationCommand;
}

export interface ServiceEndpointContinuationCommand {
  token: string;
  request: string;
  command: ContinuationCommandCommand;
}

export interface ContinuationCommandCommand {
  clickTrackingParams: string;
  showReloadUiCommand: ScrollToEngagementPanelCommandClass;
}

export interface ResponseFrameworkUpdates {
  entityBatchUpdate: FluffyEntityBatchUpdate;
  elementUpdate: ElementUpdate;
}

export interface ElementUpdate {
  updates: Update[];
}

export interface Update {
  templateUpdate?: TemplateUpdate;
  resourceStatusInResponseCheck?: ResourceStatusInResponseCheck;
}

export interface ResourceStatusInResponseCheck {
  resourceStatuses: ResourceStatus[];
  serverBuildLabel: string;
}

export interface ResourceStatus {
  identifier: string;
  status: string;
}

export interface TemplateUpdate {
  identifier: string;
  serializedTemplateConfig: string;
  dependencies?: string[];
}

export interface FluffyEntityBatchUpdate {
  mutations: FluffyMutation[];
  timestamp: Timestamp;
}

export interface FluffyMutation {
  entityKey: string;
  type: string;
  options?: Options;
  payload?: FluffyPayload;
}

export interface Options {
  persistenceOption: string;
}

export interface FluffyPayload {
  subscriptionStateEntity?: SubscriptionStateEntity;
  transcriptTrackSelectionEntity?: TranscriptTrackSelectionEntity;
  transcriptSearchBoxStateEntity?: TranscriptSearchBoxStateEntity;
}

export interface SubscriptionStateEntity {
  key: string;
  subscribed: boolean;
}

export interface TranscriptSearchBoxStateEntity {
  key: string;
  isHidden: boolean;
}

export interface TranscriptTrackSelectionEntity {
  key: string;
  selectedTrackIndex: number;
  serializedParams: string;
}

export interface OnResponseReceivedEndpoint {
  clickTrackingParams: string;
  commandMetadata?: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
  changeKeyedMarkersVisibilityCommand?: ChangeKeyedMarkersVisibilityCommand;
  loadMarkersCommand?: LoadMarkersCommand;
}

export interface ChangeKeyedMarkersVisibilityCommand {
  isVisible: boolean;
  key: string;
}

export interface LoadMarkersCommand {
  entityKeys: string[];
}

export interface PageVisualEffect {
  cinematicContainerRenderer: CinematicContainerRenderer;
}

export interface CinematicContainerRenderer {
  gradientColorConfig: GradientColorConfig[];
  presentationStyle: string;
  config: CinematicContainerRendererConfig;
}

export interface CinematicContainerRendererConfig {
  lightThemeBackgroundColor: number;
  darkThemeBackgroundColor: number;
  animationConfig: AnimationConfig;
  colorSourceSizeMultiplier: number;
  applyClientImageBlur: boolean;
  bottomColorSourceHeightMultiplier: number;
  maxBottomColorSourceHeight: number;
  colorSourceWidthMultiplier: number;
  colorSourceHeightMultiplier: number;
  blurStrength: number;
  enableInLightTheme: boolean;
}

export interface AnimationConfig {
  minImageUpdateIntervalMs: number;
  crossfadeDurationMs: number;
  crossfadeStartOffset: number;
  maxFrameRate: number;
}

export interface GradientColorConfig {
  darkThemeColor: number;
  startLocation?: number;
}

export interface PlayerOverlays {
  playerOverlayRenderer: PlayerOverlayRenderer;
}

export interface PlayerOverlayRenderer {
  endScreen: EndScreen;
  autoplay: PlayerOverlayRendererAutoplay;
  shareButton: ShareButton;
  addToMenu: AddToMenu;
  videoDetails: PlayerOverlayRendererVideoDetails;
  autonavToggle: AutonavToggle;
  decoratedPlayerBarRenderer: PlayerOverlayRendererDecoratedPlayerBarRenderer;
}

export interface AddToMenu {
  menuRenderer: AddToMenuMenuRenderer;
}

export interface AddToMenuMenuRenderer {
  items: StickyItem[];
  trackingParams: string;
}

export interface StickyItem {
  menuServiceItemRenderer: IndigoMenuServiceItemRenderer;
}

export interface IndigoMenuServiceItemRenderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint: AddToWatchLaterCommand;
  trackingParams: string;
  hasSeparator?: boolean;
}

export interface AutonavToggle {
  autoplaySwitchButtonRenderer: AutoplaySwitchButtonRenderer;
}

export interface AutoplaySwitchButtonRenderer {
  onEnabledCommand: OnAbledCommand;
  onDisabledCommand: OnAbledCommand;
  enabledAccessibilityData: DisabledAccessibilityData;
  disabledAccessibilityData: DisabledAccessibilityData;
  trackingParams: string;
  enabled: boolean;
}

export interface OnAbledCommand {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  setSettingEndpoint: SetSettingEndpoint;
}

export interface SetSettingEndpoint {
  settingItemId: string;
  boolValue: boolean;
  settingItemIdForClient: string;
}

export interface PlayerOverlayRendererAutoplay {
  playerOverlayAutoplayRenderer: PlayerOverlayAutoplayRenderer;
}

export interface PlayerOverlayAutoplayRenderer {
  title: HeaderText;
  videoTitle: ShortViewCountText;
  byline: Byline;
  pauseText: HeaderText;
  background: BackgroundClass;
  countDownSecs: number;
  cancelButton: VoiceSearchButton;
  nextButton: VoiceSearchButton;
  trackingParams: string;
  closeButton: A11YSkipNavigationButtonClass;
  thumbnailOverlays: PlayerOverlayAutoplayRendererThumbnailOverlay[];
  preferImmediateRedirect: boolean;
  videoId: string;
  publishedTimeText: HeaderText;
  webShowNewAutonavCountdown: boolean;
  webShowBigThumbnailEndscreen: boolean;
  shortViewCountText: ShortViewCountText;
  countDownSecsForFullscreen: number;
}

export interface PlayerOverlayAutoplayRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer;
}

export interface PlayerOverlayRendererDecoratedPlayerBarRenderer {
  decoratedPlayerBarRenderer: DecoratedPlayerBarRendererDecoratedPlayerBarRenderer;
}

export interface DecoratedPlayerBarRendererDecoratedPlayerBarRenderer {
  playerBar: PlayerBar;
}

export interface PlayerBar {
  multiMarkersPlayerBarRenderer: MultiMarkersPlayerBarRenderer;
}

export interface MultiMarkersPlayerBarRenderer {
  visibleOnLoad: VisibleOnLoad;
  markersMap: MarkersMap[];
}

export interface MarkersMap {
  key: string;
  value: Value;
}

export interface Value {
  trackingParams: string;
  heatmap: Heatmap;
}

export interface Heatmap {
  heatmapRenderer: HeatmapRenderer;
}

export interface HeatmapRenderer {
  maxHeightDp: number;
  minHeightDp: number;
  showHideAnimationDurationMillis: number;
  heatMarkers: HeatMarker[];
  heatMarkersDecorations: HeatMarkersDecoration[];
}

export interface HeatMarker {
  heatMarkerRenderer: HeatMarkerRenderer;
}

export interface HeatMarkerRenderer {
  timeRangeStartMillis: number;
  markerDurationMillis: number;
  heatMarkerIntensityScoreNormalized: number;
}

export interface HeatMarkersDecoration {
  timedMarkerDecorationRenderer: TimedMarkerDecorationRenderer;
}

export interface TimedMarkerDecorationRenderer {
  visibleTimeRangeStartMillis: number;
  visibleTimeRangeEndMillis: number;
  decorationTimeMillis: number;
  label: Subtitle;
  icon: string;
  trackingParams: string;
}

export interface VisibleOnLoad {
  key: string;
}

export interface EndScreen {
  watchNextEndScreenRenderer: WatchNextEndScreenRenderer;
}

export interface WatchNextEndScreenRenderer {
  results: WatchNextEndScreenRendererResult[];
  title: HeaderText;
  trackingParams: string;
}

export interface WatchNextEndScreenRendererResult {
  endScreenVideoRenderer: EndScreenVideoRenderer;
}

export interface EndScreenVideoRenderer {
  videoId: string;
  thumbnail: BackgroundClass;
  title: ShortViewCountText;
  shortBylineText: Byline;
  lengthText: ShortViewCountText;
  lengthInSeconds: number;
  navigationEndpoint: CurrentVideoEndpointClass;
  trackingParams: string;
  shortViewCountText: ShortViewCountText;
  publishedTimeText: HeaderText;
  thumbnailOverlays: EndScreenVideoRendererThumbnailOverlay[];
}

export interface EndScreenVideoRendererThumbnailOverlay {
  thumbnailOverlayTimeStatusRenderer?: ThumbnailOverlayTimeStatusRenderer;
  thumbnailOverlayNowPlayingRenderer?: ThumbnailOverlayNowPlayingRenderer;
}

export interface ShareButton {
  buttonRenderer: ShareButtonButtonRenderer;
}

export interface ShareButtonButtonRenderer {
  style: string;
  size: Size;
  isDisabled: boolean;
  icon: Icon;
  navigationEndpoint: ServiceEndpointClass;
  tooltip: string;
  trackingParams: string;
}

export interface PlayerOverlayRendererVideoDetails {
  playerOverlayVideoDetailsRenderer: PlayerOverlayVideoDetailsRenderer;
}

export interface PlayerOverlayVideoDetailsRenderer {
  title: HeaderText;
  subtitle: Subtitle;
}

export interface ResponseResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: MainAppWebResponseContext;
  webResponseContextExtensionData: FluffyWebResponseContextExtensionData;
}

export interface FluffyWebResponseContextExtensionData {
  ytConfigData: YtConfigData;
  webPrefetchData: WebPrefetchData;
  hasDecorated: boolean;
}

export interface WebPrefetchData {
  navigationEndpoints: NavigationEndpoint[];
}

export interface YtConfigData {
  visitorData: string;
  sessionIndex: number;
  rootVisualElementType: number;
}

export interface Topbar {
  desktopTopbarRenderer: DesktopTopbarRenderer;
}

export interface DesktopTopbarRenderer {
  logo: Logo;
  searchbox: Searchbox;
  trackingParams: string;
  countryCode: string;
  topbarButtons: TopbarButton[];
  hotkeyDialog: HotkeyDialog;
  backButton: BackButtonClass;
  forwardButton: BackButtonClass;
  a11ySkipNavigationButton: A11YSkipNavigationButtonClass;
  voiceSearchButton: VoiceSearchButton;
}

export interface BackButtonClass {
  buttonRenderer: BackButtonButtonRenderer;
}

export interface BackButtonButtonRenderer {
  trackingParams: string;
  command: MenuServiceItemRendererCommand;
}

export interface HotkeyDialog {
  hotkeyDialogRenderer: HotkeyDialogRenderer;
}

export interface HotkeyDialogRenderer {
  title: Subtitle;
  sections: HotkeyDialogRendererSection[];
  dismissButton: A11YSkipNavigationButtonClass;
  trackingParams: string;
}

export interface HotkeyDialogRendererSection {
  hotkeyDialogSectionRenderer: HotkeyDialogSectionRenderer;
}

export interface HotkeyDialogSectionRenderer {
  title: Subtitle;
  options: Option[];
}

export interface Option {
  hotkeyDialogSectionOptionRenderer: HotkeyDialogSectionOptionRenderer;
}

export interface HotkeyDialogSectionOptionRenderer {
  label: Subtitle;
  hotkey: string;
  hotkeyAccessibilityLabel?: DisabledAccessibilityData;
}

export interface Logo {
  topbarLogoRenderer: TopbarLogoRenderer;
}

export interface TopbarLogoRenderer {
  iconImage: Icon;
  tooltipText: Subtitle;
  endpoint: TopbarLogoRendererEndpoint;
  trackingParams: string;
  overrideEntityKey: string;
}

export interface TopbarLogoRendererEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  browseEndpoint: EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
  browseId: string;
}

export interface Searchbox {
  fusionSearchboxRenderer: FusionSearchboxRenderer;
}

export interface FusionSearchboxRenderer {
  icon: Icon;
  placeholderText: Subtitle;
  config: FusionSearchboxRendererConfig;
  trackingParams: string;
  searchEndpoint: FusionSearchboxRendererSearchEndpoint;
  clearButton: VoiceSearchButton;
}

export interface FusionSearchboxRendererConfig {
  webSearchboxConfig: WebSearchboxConfig;
}

export interface WebSearchboxConfig {
  requestLanguage: string;
  requestDomain: string;
  hasOnscreenKeyboard: boolean;
  focusSearchbox: boolean;
}

export interface FusionSearchboxRendererSearchEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  searchEndpoint: SearchEndpointSearchEndpoint;
}

export interface SearchEndpointSearchEndpoint {
  query: string;
}

export interface TopbarButton {
  topbarMenuButtonRenderer?: TopbarMenuButtonRenderer;
  notificationTopbarButtonRenderer?: NotificationTopbarButtonRenderer;
}

export interface NotificationTopbarButtonRenderer {
  icon: Icon;
  menuRequest: MenuRequest;
  style: string;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
  updateUnseenCountEndpoint: UpdateUnseenCountEndpoint;
  notificationCount: number;
  handlerDatas: string[];
}

export interface MenuRequest {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  signalServiceEndpoint: MenuRequestSignalServiceEndpoint;
}

export interface MenuRequestSignalServiceEndpoint {
  signal: string;
  actions: CunningAction[];
}

export interface CunningAction {
  clickTrackingParams: string;
  openPopupAction: IndecentOpenPopupAction;
}

export interface IndecentOpenPopupAction {
  popup: HilariousPopup;
  popupType: string;
  beReused: boolean;
}

export interface HilariousPopup {
  multiPageMenuRenderer: PopupMultiPageMenuRenderer;
}

export interface PopupMultiPageMenuRenderer {
  trackingParams: string;
  style: string;
  showLoadingSpinner: boolean;
}

export interface UpdateUnseenCountEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  signalServiceEndpoint: Signal;
}

export interface TopbarMenuButtonRenderer {
  icon?: Icon;
  menuRenderer?: TopbarMenuButtonRendererMenuRenderer;
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
  style?: DownloadButtonRendererStyle;
  avatar?: Avatar;
  menuRequest?: MenuRequest;
}

export interface TopbarMenuButtonRendererMenuRenderer {
  multiPageMenuRenderer: MenuRendererMultiPageMenuRenderer;
}

export interface MenuRendererMultiPageMenuRenderer {
  sections: MultiPageMenuRendererSection[];
  trackingParams: string;
  style: string;
}

export interface MultiPageMenuRendererSection {
  multiPageMenuSectionRenderer: MultiPageMenuSectionRenderer;
}

export interface MultiPageMenuSectionRenderer {
  items: MultiPageMenuSectionRendererItem[];
  trackingParams: string;
}

export interface MultiPageMenuSectionRendererItem {
  compactLinkRenderer: CompactLinkRenderer;
}

export interface CompactLinkRenderer {
  icon: Icon;
  title: Subtitle;
  navigationEndpoint: CompactLinkRendererNavigationEndpoint;
  trackingParams: string;
  style: string;
}

export interface CompactLinkRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  uploadEndpoint?: AdsEngagementPanelContentRenderer;
  signalNavigationEndpoint?: Signal;
}
