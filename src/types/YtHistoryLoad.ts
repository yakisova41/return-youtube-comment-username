import { type ContinuationItems } from "./AppendContinuationItemsAction";

export interface YtHistoryLoad {
  isTrusted?: boolean;
  endpoint?: ArgEndpoint;
  forward?: boolean;
  historyEntry?: HistoryEntry;
  savedComponentState?: any;
  legacyBorder?: boolean;
}

export interface ArgEndpoint {
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

export interface HistoryEntry {
  rootData: RootData;
  scrollTop: number;
}

export interface RootData {
  page: string;
  endpoint: ArgEndpoint;
  response: Response;
  playerResponse: PlayerResponse;
  url: string;
  graftedVes: GraftedVe[];
  csn: string;
}

export interface GraftedVe {
  veData: VeData;
  csn: string;
}

export interface VeData {
  trackingParams: string;
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
  infoCardIconRenderer: VeData;
}

export interface PlayerResponseFrameworkUpdates {
  entityBatchUpdate: EntityBatchUpdate;
}

export interface EntityBatchUpdate {
  mutations: any[];
  timestamp: Timestamp;
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
  signatureCipher: string;
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
  signatureCipher: string;
}

export interface PlayerResponseVideoDetails {
  videoId: string;
  title: string;
  lengthSeconds: string;
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

export interface Response {
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
  contents: ContinuationItems;
  trackingParams: string;
  sectionIdentifier: string;
  targetId?: string;
  header?: HeaderElement[];
}

export interface PurpleContent {
  commentsEntryPointHeaderRenderer?: CommentsEntryPointHeaderRenderer;
  commentThreadRenderer?: CommentThreadRenderer;
  continuationItemRenderer?: PurpleContinuationItemRenderer;
}

export interface CommentThreadRenderer {
  comment: Comment;
  trackingParams: string;
  renderingPriority: RenderingPriority;
  isModeratedElqComment: boolean;
  loggingDirectives: CommentRendererLoggingDirectives;
  replies?: Replies;
}

export interface Comment {
  commentRenderer: CommentRenderer;
}

export interface CommentRenderer {
  authorText: HeaderText;
  authorThumbnail: Avatar;
  authorEndpoint: ChannelNavigationEndpointClass;
  contentText: ContentText;
  publishedTimeText: PublishedTimeText;
  isLiked: boolean;
  actionMenu: ActionMenu;
  commentId: string;
  actionButtons: ActionButtons;
  authorIsChannelOwner: boolean;
  currentUserReplyThumbnail: BackgroundClass;
  voteStatus: Status;
  trackingParams: string;
  voteCount?: ShortViewCountText;
  pinnedCommentBadge?: PinnedCommentBadge;
  expandButton: A11YSkipNavigationButtonClass;
  collapseButton: A11YSkipNavigationButtonClass;
  authorCommentBadge?: AuthorCommentBadge;
  loggingDirectives: CommentRendererLoggingDirectives;
  replyCount?: number;
}

export interface ActionButtons {
  commentActionButtonsRenderer: CommentActionButtonsRenderer;
}

export interface CommentActionButtonsRenderer {
  likeButton: LikeButton;
  replyButton: A11YSkipNavigationButtonClass;
  dislikeButton: LikeButton;
  trackingParams: string;
  protoCreationMs: string;
  style: CommentActionButtonsRendererStyle;
}

export interface LikeButton {
  toggleButtonRenderer: PurpleToggleButtonRenderer;
}

export interface PurpleToggleButtonRenderer {
  style: StyleClass;
  size: SizeClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: DefaultTooltip;
  toggledTooltip: ToggleButtonRendererToggledTooltip;
  toggledStyle: StyleClass;
  accessibilityData: DisabledAccessibilityData;
  toggledAccessibilityData: DisabledAccessibilityData;
}

export interface DisabledAccessibilityData {
  accessibilityData: Accessibility;
}

export interface Accessibility {
  label: string;
}

export interface Icon {
  iconType: string;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  performCommentActionEndpoint: PerformCommentActionEndpoint;
}

export interface PerformCommentActionEndpoint {
  action: string;
  clientActions: ClientAction[];
}

export interface ClientAction {
  clickTrackingParams: string;
  updateCommentVoteAction: UpdateCommentVoteAction;
}

export interface UpdateCommentVoteAction {
  voteCount?: ShortViewCountText;
  voteStatus: Status;
}

export interface ShortViewCountText {
  accessibility: DisabledAccessibilityData;
  simpleText: string;
}

export enum Status {
  Dislike = "DISLIKE",
  Indifferent = "INDIFFERENT",
  Like = "LIKE",
}

export enum DefaultTooltip {
  低評価 = "低評価",
  高評価 = "高評価",
}

export interface SizeClass {
  sizeType: SizeTypeEnum;
}

export enum SizeTypeEnum {
  SizeDefault = "SIZE_DEFAULT",
}

export interface StyleClass {
  styleType: StyleType;
}

export enum StyleType {
  StyleDefaultActive = "STYLE_DEFAULT_ACTIVE",
  StyleText = "STYLE_TEXT",
}

export enum ToggleButtonRendererToggledTooltip {
  低評価を取り消す = "低評価を取り消す",
  高評価を取り消し = "高評価を取り消し",
}

export interface CommentReplyDialogRenderer {
  replyButton: A11YSkipNavigationButtonClass;
  cancelButton: CancelButton;
  authorThumbnail: Avatar;
  placeholderText: Subtitle;
  errorMessage: Subtitle;
  emojiButton: EmojiButton;
  emojiPicker: EmojiPicker;
  aadcGuidelinesStateEntityKey: AadcGuidelinesStateEntityKey;
}

export interface Dialog {
  commentReplyDialogRenderer: CommentReplyDialogRenderer;
}

export interface CreateCommentReplyDialogEndpoint {
  dialog: Dialog;
}

export interface ButtonRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: PurpleCommandMetadata;
  createCommentReplyDialogEndpoint: CreateCommentReplyDialogEndpoint;
}

export interface A11YSkipNavigationButtonButtonRenderer {
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
  text?: Subtitle;
  navigationEndpoint?: ButtonRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: PurpleServiceEndpoint;
  accessibility?: Accessibility;
  accessibilityData?: DisabledAccessibilityData;
  isDisabled?: boolean;
  command?: PurpleCommand;
  icon?: Icon;
}

export interface A11YSkipNavigationButtonClass {
  buttonRenderer: A11YSkipNavigationButtonButtonRenderer;
}

export enum AadcGuidelinesStateEntityKey {
  Egw3OTMXNTkxMTc1MTEgmQIoAQ3D3D = "Egw3OTMxNTkxMTc1MTEgmQIoAQ%3D%3D",
}

export interface Avatar {
  thumbnails: ThumbnailElement[];
  accessibility: DisabledAccessibilityData;
}

export interface CancelButton {
  buttonRenderer: FluffyButtonRenderer;
}

export interface FluffyButtonRenderer {
  text: Subtitle;
  trackingParams: string;
}

export interface EmojiButton {
  buttonRenderer: EmojiButtonButtonRenderer;
}

export interface EmojiButtonButtonRenderer {
  size: PurpleSize;
  icon: Icon;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
}

export enum PurpleSize {
  SizeSmall = "SIZE_SMALL",
}

export interface EmojiPicker {
  emojiPickerRenderer: EmojiPickerRenderer;
}

export interface EmojiPickerRenderer {
  id: ID;
  categories: Category[];
  categoryButtons: CategoryButton[];
  searchPlaceholderText: Subtitle;
  searchNoResultsText: Subtitle;
  pickSkinToneText: Subtitle;
  trackingParams: string;
  clearSearchLabel: ClearSearchLabel;
  skinToneGenericLabel: SkinToneGenericLabel;
  skinToneLightLabel: SkinToneLightLabel;
  skinToneMediumLightLabel: SkinToneMediumLightLabel;
  skinToneMediumLabel: SkinToneMediumLabel;
  skinToneMediumDarkLabel: SkinToneMediumDarkLabel;
  skinToneDarkLabel: SkinToneDarkLabel;
}

export interface Category {
  emojiPickerCategoryRenderer: EmojiPickerCategoryRenderer;
}

export interface EmojiPickerCategoryRenderer {
  categoryId: CategoryID;
  title: HeaderText;
  emojiIds: string[];
  trackingParams: string;
  categoryType: CategoryType;
  imageLoadingLazy?: boolean;
}

export enum CategoryID {
  Activities = "activities",
  Food = "food",
  Nature = "nature",
  Objects = "objects",
  People = "people",
  Symbols = "symbols",
  Travel = "travel",
  UC4R8DWoMoI7CAwX8LjQHIG = "UC4R8DWoMoI7CAwX8_LjQHig",
  UCkszU2WH9Gy1Mb0DV11UJg = "UCkszU2WH9gy1mb0dV-11UJg",
}

export enum CategoryType {
  CategoryTypeGlobal = "CATEGORY_TYPE_GLOBAL",
  CategoryTypeSeasonal = "CATEGORY_TYPE_SEASONAL",
  CategoryTypeUnicode = "CATEGORY_TYPE_UNICODE",
}

export interface CategoryButton {
  emojiPickerCategoryButtonRenderer: EmojiPickerCategoryButtonRenderer;
}

export interface EmojiPickerCategoryButtonRenderer {
  categoryId: CategoryID;
  icon: Icon;
  tooltip: Tooltip;
  accessibility: DisabledAccessibilityData;
  targetId?: TargetID;
}

export enum TargetID {
  EmojiPickerCategoryButtonPeople = "emoji-picker-category-button-people",
}

export enum Tooltip {
  YouTube = "YouTube",
  アイテム = "アイテム",
  アクティビティ = "アクティビティ",
  プライド = "プライド",
  人 = "人",
  旅行 = "旅行",
  自然 = "自然",
  記号 = "記号",
  食べ物 = "食べ物",
}

export enum ClearSearchLabel {
  検索をクリア = "検索をクリア",
}

export enum ID {
  Emoji = "emoji",
}

export enum SkinToneDarkLabel {
  濃い肌の色 = "濃い肌の色",
}

export enum SkinToneGenericLabel {
  汎用的な肌の色 = "汎用的な肌の色",
}

export enum SkinToneLightLabel {
  明るい肌の色 = "明るい肌の色",
}

export enum SkinToneMediumDarkLabel {
  やや濃い肌の色 = "やや濃い肌の色",
}

export enum SkinToneMediumLabel {
  中間的な明るさの肌の色 = "中間的な明るさの肌の色",
}

export enum SkinToneMediumLightLabel {
  やや明るい肌の色 = "やや明るい肌の色",
}

export interface PurpleCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface PurpleCommand {
  clickTrackingParams: string;
  openPopupAction?: OnClickCommandOpenPopupAction;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  createBackstagePostEndpoint?: CreateBackstagePostEndpoint;
  signalServiceEndpoint?: CommandSignalServiceEndpoint;
}

export interface CreateBackstagePostEndpoint {
  createBackstagePostParams: string;
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
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
  isDisabled: boolean;
  text: HeaderText;
  trackingParams: string;
  command?: FluffyCommand;
}

export interface FluffyCommand {
  clickTrackingParams: string;
  commandExecutorCommand?: PurpleCommandExecutorCommand;
  commandMetadata?: EndpointCommandMetadata;
  urlEndpoint?: CommandURLEndpoint;
}

export interface PurpleCommandExecutorCommand {
  commands: TentacledCommand[];
}

export interface TentacledCommand {
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

export interface CommandURLEndpoint {
  url: string;
  target: Target;
}

export enum Target {
  TargetNewWindow = "TARGET_NEW_WINDOW",
}

export enum ButtonRendererStyle {
  StyleBlueText = "STYLE_BLUE_TEXT",
  StyleDefault = "STYLE_DEFAULT",
  StylePrimary = "STYLE_PRIMARY",
  StyleText = "STYLE_TEXT",
}

export enum PurplePopupType {
  Dialog = "DIALOG",
}

export interface CommandSignalServiceEndpoint {
  signal: SignalEnum;
  actions: TentacledAction[];
}

export interface TentacledAction {
  clickTrackingParams: string;
  signalAction: Signal;
}

export interface Signal {
  signal: string;
}

export enum SignalEnum {
  ClientSignal = "CLIENT_SIGNAL",
}

export interface PurpleServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  createCommentReplyEndpoint?: CreateCommentReplyEndpoint;
  createCommentEndpoint?: CreateCommentEndpoint;
  unsubscribeEndpoint?: SubscribeEndpoint;
}

export interface CreateCommentEndpoint {
  createCommentParams: string;
}

export interface CreateCommentReplyEndpoint {
  createReplyParams: string;
}

export enum CommentActionButtonsRendererStyle {
  CommentActionButtonStyleTypeDesktopToolbar = "COMMENT_ACTION_BUTTON_STYLE_TYPE_DESKTOP_TOOLBAR",
}

export interface ActionMenu {
  menuRenderer: ActionMenuMenuRenderer;
}

export interface ActionMenuMenuRenderer {
  items: PurpleItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
  menuPopupAccessibility: Accessibility;
}

export interface PurpleItem {
  menuServiceItemRenderer: Renderer;
}

export interface Renderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint?: FluffyServiceEndpoint;
  trackingParams: string;
  iconPosition?: string;
}

export interface FluffyServiceEndpoint {
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
  actions: StickyAction[];
}

export interface StickyAction {
  clickTrackingParams: string;
  showEngagementPanelEndpoint: ShowEngagementPanelEndpoint;
}

export interface ShowEngagementPanelEndpoint {
  panelIdentifier: string;
}

export interface AuthorCommentBadge {
  authorCommentBadgeRenderer: AuthorCommentBadgeRenderer;
}

export interface AuthorCommentBadgeRenderer {
  icon: Icon;
  color: AuthorCommentBadgeRendererColor;
  authorText: ShortViewCountText;
  authorEndpoint: ChannelNavigationEndpointClass;
  iconTooltip: string;
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

export interface AuthorCommentBadgeRendererColor {
  basicColorPaletteData: PurpleBasicColorPaletteData;
}

export interface PurpleBasicColorPaletteData {
  backgroundColor: number;
  foregroundTitleColor: number;
}

export interface ContentText {
  runs: ContentTextRun[];
}

export interface ContentTextRun {
  text: string;
  navigationEndpoint?: InnertubeCommand;
  loggingDirectives?: RunLoggingDirectives;
  emoji?: Emoji;
}

export interface Emoji {
  emojiId: string;
  shortcuts: string[];
  searchTerms: string[];
  image: Avatar;
  supportsSkinTone?: boolean;
  variantIds?: string[];
}

export interface RunLoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
}

export interface VisibilityClass {
  types: string;
}

export interface InnertubeCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  urlEndpoint: InnertubeCommandURLEndpoint;
}

export interface InnertubeCommandURLEndpoint {
  url: string;
  target: Target;
  nofollow: boolean;
}

export interface CommentRendererLoggingDirectives {
  trackingParams: string;
  visibility: VisibilityClass;
  enableDisplayloggerExperiment: boolean;
}

export interface PinnedCommentBadge {
  pinnedCommentBadgeRenderer: PinnedCommentBadgeRenderer;
}

export interface PinnedCommentBadgeRenderer {
  icon: Icon;
  label: Subtitle;
  color: PinnedCommentBadgeRendererColor;
}

export interface PinnedCommentBadgeRendererColor {
  basicColorPaletteData: FluffyBasicColorPaletteData;
}

export interface FluffyBasicColorPaletteData {
  foregroundTitleColor: number;
}

export interface PublishedTimeText {
  runs: PublishedTimeTextRun[];
}

export interface PublishedTimeTextRun {
  text: string;
  navigationEndpoint: RunNavigationEndpoint;
}

export interface RunNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  watchEndpoint: GetDownloadActionCommand;
}

export interface GetDownloadActionCommand {
  videoId: string;
  params: string;
}

export enum RenderingPriority {
  RenderingPriorityPinnedComment = "RENDERING_PRIORITY_PINNED_COMMENT",
  RenderingPriorityUnknown = "RENDERING_PRIORITY_UNKNOWN",
}

export interface Replies {
  commentRepliesRenderer: CommentRepliesRenderer;
}

export interface CommentRepliesRenderer {
  contents: CommentRepliesRendererContent[];
  trackingParams: string;
  viewReplies: HideRepliesClass;
  hideReplies: HideRepliesClass;
  targetId: string;
}

export interface CommentRepliesRendererContent {
  continuationItemRenderer: PurpleContinuationItemRenderer;
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

export interface HideRepliesClass {
  buttonRenderer: Renderer;
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
  commentsSimpleboxRenderer: CommentsSimpleboxRenderer;
}

export interface CommentsSimpleboxRenderer {
  simpleboxAvatar: Avatar;
  simpleboxPlaceholder: Subtitle;
  trackingParams: string;
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

export interface HeaderElement {
  commentsHeaderRenderer: CommentsHeaderRenderer;
}

export interface CommentsHeaderRenderer {
  countText: Subtitle;
  createRenderer: CreateRenderer;
  sortMenu: SortMenu;
  trackingParams: string;
  titleText: Subtitle;
  commentsCount: Subtitle;
  showSeparator: boolean;
  customEmojis: CustomEmoji[];
  unicodeEmojisUrl: string;
  loggingDirectives: CommentRendererLoggingDirectives;
}

export interface CreateRenderer {
  commentSimpleboxRenderer: CommentSimpleboxRenderer;
}

export interface CommentSimpleboxRenderer {
  submitButton: A11YSkipNavigationButtonClass;
  cancelButton: A11YSkipNavigationButtonClass;
  authorThumbnail: Avatar;
  placeholderText: Subtitle;
  trackingParams: string;
  avatarSize: string;
  emojiButton: EmojiButton;
  emojiPicker: EmojiPicker;
  aadcGuidelinesStateEntityKey: AadcGuidelinesStateEntityKey;
}

export interface CustomEmoji {
  emojiId: string;
  shortcuts: string[];
  searchTerms: string[];
  image: Avatar;
  isCustomEmoji: boolean;
  index: number;
}

export interface SortMenu {
  sortFilterSubMenuRenderer: SortMenuSortFilterSubMenuRenderer;
}

export interface SortMenuSortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  title: string;
  icon: Icon;
  accessibility: DisabledAccessibilityData;
  tooltip: string;
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

export interface VideoPrimaryInfoRenderer {
  title: Subtitle;
  viewCount: ViewCount;
  videoActions: VideoActions;
  trackingParams: string;
  dateText: HeaderText;
  relativeDateText: ShortViewCountText;
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
  serviceEndpoint: TentacledServiceEndpoint;
  trackingParams: string;
}

export interface TentacledServiceEndpoint {
  clickTrackingParams: string;
  offlineVideoEndpoint: PurpleOfflineVideoEndpoint;
}

export interface PurpleOfflineVideoEndpoint {
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
  serviceEndpoint: CommandClass;
  trackingParams: string;
  isDisabled?: boolean;
}

export interface CommandClass {
  clickTrackingParams: string;
  changeEngagementPanelVisibilityAction?: ChangeEngagementPanelVisibilityAction;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  addToPlaylistServiceEndpoint?: WatchEndpoint;
}

export interface MenuFlexibleItemRendererTopLevelButton {
  downloadButtonRenderer?: DownloadButtonRenderer;
  buttonRenderer?: TentacledButtonRenderer;
}

export interface TentacledButtonRenderer {
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
  isDisabled: boolean;
  text: Subtitle;
  icon: Icon;
  tooltip: string;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  targetId?: string;
  command: CommandClass;
  accessibility?: Accessibility;
}

export interface DownloadButtonRenderer {
  trackingParams: string;
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
  targetId: string;
  command: DownloadButtonRendererCommand;
}

export interface DownloadButtonRendererCommand {
  clickTrackingParams: string;
  offlineVideoEndpoint: CommandOfflineVideoEndpoint;
}

export interface CommandOfflineVideoEndpoint {
  videoId: string;
  onAddCommand: PurpleOnAddCommand;
  action: string;
}

export interface TopLevelButtonElement {
  segmentedLikeDislikeButtonRenderer?: SegmentedLikeDislikeButtonRenderer;
  buttonRenderer?: StickyButtonRenderer;
}

export interface StickyButtonRenderer {
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
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
  likeButton: SegmentedLikeDislikeButtonRendererLikeButton;
  dislikeButton: DislikeButton;
  likeCount: string;
}

export interface DislikeButton {
  toggleButtonRenderer: FluffyToggleButtonRenderer;
}

export interface FluffyToggleButtonRenderer {
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
  commands: StickyCommand[];
}

export interface StickyCommand {
  clickTrackingParams: string;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  likeEndpoint?: PurpleLikeEndpoint;
}

export interface PurpleLikeEndpoint {
  status: Status;
  target: WatchEndpoint;
  dislikeParams: string;
}

export interface UpdateToggleButtonStateCommand {
  toggled: boolean;
  buttonId: string;
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
  status: Status;
  target: WatchEndpoint;
  removeLikeParams: string;
}

export interface SegmentedLikeDislikeButtonRendererLikeButton {
  toggleButtonRenderer: TentacledToggleButtonRenderer;
}

export interface TentacledToggleButtonRenderer {
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
  toggledTooltip: ToggleButtonRendererToggledTooltip;
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
  commands: IndigoCommand[];
}

export interface IndigoCommand {
  clickTrackingParams: string;
  updateToggleButtonStateCommand?: UpdateToggleButtonStateCommand;
  commandMetadata?: AddToWatchLaterCommandCommandMetadata;
  likeEndpoint?: FluffyLikeEndpoint;
}

export interface FluffyLikeEndpoint {
  status: Status;
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
}

export interface CommandRun {
  startIndex: number;
  length: number;
  onTap: OnTap;
}

export interface OnTap {
  innertubeCommand: InnertubeCommand;
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
  badges: OwnerBadgeElement[];
}

export interface OwnerBadgeElement {
  metadataBadgeRenderer: OwnerBadgeMetadataBadgeRenderer;
}

export interface OwnerBadgeMetadataBadgeRenderer {
  icon: Icon;
  style: string;
  tooltip: string;
  trackingParams: string;
  accessibilityData: Accessibility;
}

export interface SubscriptionButton {
  type: string;
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
  commands: IndecentCommand[];
}

export interface IndecentCommand {
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
  menuServiceItemRenderer: PurpleMenuServiceItemRenderer;
}

export interface PurpleMenuServiceItemRenderer {
  text: Title;
  icon: Icon;
  serviceEndpoint: StickyServiceEndpoint;
  trackingParams: string;
  isSelected?: boolean;
}

export interface StickyServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: AddToWatchLaterCommandCommandMetadata;
  modifyChannelNotificationPreferenceEndpoint?: GetTranscriptEndpointClass;
  signalServiceEndpoint?: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface OnUnsubscribeEndpointSignalServiceEndpoint {
  signal: SignalEnum;
  actions: IndigoAction[];
}

export interface IndigoAction {
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

export interface IndigoServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: FluffySignalServiceEndpoint;
}

export interface VoiceSearchButtonButtonRenderer {
  style?: ButtonRendererStyle;
  size?: SizeTypeEnum;
  isDisabled?: boolean;
  icon?: Icon;
  accessibility?: Accessibility;
  trackingParams: string;
  accessibilityData: DisabledAccessibilityData;
  targetId?: string;
  command?: HilariousCommand;
  text?: HeaderText;
  navigationEndpoint?: CurrentVideoEndpointClass;
  serviceEndpoint?: IndigoServiceEndpoint;
  tooltip?: string;
}

export interface VoiceSearchButton {
  buttonRenderer: VoiceSearchButtonButtonRenderer;
}

export interface OnUnsubscribeEndpointCommandMetadata {
  webCommandMetadata: StickyWebCommandMetadata;
}

export interface StickyWebCommandMetadata {
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

export interface WatchEndpointSupportedOnesieConfig {
  html5PlaybackOnesieConfig: Html5PlaybackOnesieConfig;
}

export interface Html5PlaybackOnesieConfig {
  commonConfig: CommonConfig;
}

export interface CommonConfig {
  url: string;
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
  ownerBadges?: OwnerBadgeElement[];
  trackingParams: string;
  shortViewCountText: ShortViewCountText;
  menu: CompactVideoRendererMenu;
  thumbnailOverlays: CompactVideoRendererThumbnailOverlay[];
  accessibility: DisabledAccessibilityData;
  badges?: PurpleBadge[];
  richThumbnail?: RichThumbnail;
}

export interface PurpleBadge {
  metadataBadgeRenderer: PurpleMetadataBadgeRenderer;
}

export interface PurpleMetadataBadgeRenderer {
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
  menuServiceItemRenderer?: FluffyMenuServiceItemRenderer;
  menuServiceItemDownloadRenderer?: ItemMenuServiceItemDownloadRenderer;
}

export interface ItemMenuServiceItemDownloadRenderer {
  serviceEndpoint: IndecentServiceEndpoint;
  trackingParams: string;
}

export interface IndecentServiceEndpoint {
  clickTrackingParams: string;
  offlineVideoEndpoint: FluffyOfflineVideoEndpoint;
}

export interface FluffyOfflineVideoEndpoint {
  videoId: string;
  onAddCommand: FluffyOnAddCommand;
}

export interface FluffyOnAddCommand {
  clickTrackingParams: string;
  getDownloadActionCommand: GetDownloadActionCommand;
}

export interface FluffyMenuServiceItemRenderer {
  text: Subtitle;
  icon: Icon;
  serviceEndpoint: HilariousServiceEndpoint;
  trackingParams: string;
  hasSeparator?: boolean;
}

export interface HilariousServiceEndpoint {
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
  style: ButtonRendererStyle;
  text: Title;
  serviceEndpoint?: AmbitiousServiceEndpoint;
  trackingParams: string;
  command?: CunningCommand;
}

export interface CunningCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  urlEndpoint: CommandURLEndpoint;
}

export interface AmbitiousServiceEndpoint {
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
  params: Params;
}

export enum Params {
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

export interface RichThumbnail {
  movingThumbnailRenderer: MovingThumbnailRenderer;
}

export interface MovingThumbnailRenderer {
  enableHoveredLogging: boolean;
  enableOverlay: boolean;
  movingThumbnailDetails?: MovingThumbnailDetails;
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
  toggledTooltip: ThumbnailOverlayToggleButtonRendererToggledTooltip;
  untoggledServiceEndpoint: UntoggledServiceEndpoint;
  toggledServiceEndpoint?: RemoveFromWatchLaterCommand;
  untoggledAccessibility: DisabledAccessibilityData;
  toggledAccessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export enum ThumbnailOverlayToggleButtonRendererToggledTooltip {
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
  loggingDirectives: CommentRendererLoggingDirectives;
  panelIdentifier?: string;
  header?: EngagementPanelSectionListRendererHeader;
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
  contents: CommentRepliesRendererContent[];
  trackingParams: string;
  sectionIdentifier: string;
  targetId: string;
}

export interface StructuredDescriptionContentRenderer {
  items: StructuredDescriptionContentRendererItem[];
}

export interface StructuredDescriptionContentRendererItem {
  videoDescriptionHeaderRenderer?: VideoDescriptionHeaderRenderer;
  expandableVideoDescriptionBodyRenderer?: ExpandableVideoDescriptionBodyRenderer;
  videoDescriptionMusicSectionRenderer?: VideoDescriptionMusicSectionRenderer;
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
  channelThumbnail: ChannelThumbnail;
}

export interface ChannelThumbnail {
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
  channelAvatar: ChannelThumbnail;
  channelEndpoint: ChannelNavigationEndpointClass;
  trackingParams: string;
}

export interface CreatorButton {
  buttonRenderer: CreatorAboutButtonButtonRenderer;
}

export interface CreatorAboutButtonButtonRenderer {
  style: string;
  size: SizeTypeEnum;
  isDisabled: boolean;
  text: HeaderText;
  icon: Icon;
  trackingParams: string;
  command: MagentaCommand;
}

export interface MagentaCommand {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  browseEndpoint: CommandBrowseEndpoint;
}

export interface CommandBrowseEndpoint {
  browseId: string;
  params: string;
}

export interface VideoDescriptionMusicSectionRenderer {
  sectionTitle: HeaderText;
  carouselLockups: CarouselLockup[];
  topicLink: TopicLink;
}

export interface CarouselLockup {
  carouselLockupRenderer: CarouselLockupRenderer;
}

export interface CarouselLockupRenderer {
  infoRows: InfoRow[];
}

export interface InfoRow {
  infoRowRenderer: InfoRowRenderer;
}

export interface InfoRowRenderer {
  title: HeaderText;
  defaultMetadata?: DefaultMetadata;
  trackingParams: string;
  infoRowExpandStatusKey?: string;
  expandedMetadata?: HeaderText;
  expandIcon?: Icon;
}

export interface DefaultMetadata {
  simpleText?: string;
  runs?: BylineRun[];
}

export interface TopicLink {
  topicLinkRenderer: TopicLinkRenderer;
}

export interface TopicLinkRenderer {
  title: HeaderText;
  thumbnailDetails: ChannelThumbnail;
  endpoint: TopicLinkRendererEndpoint;
  callToActionIcon: Icon;
  trackingParams: string;
}

export interface TopicLinkRendererEndpoint {
  clickTrackingParams: string;
  commandMetadata: EndpointCommandMetadata;
  browseEndpoint: EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
  browseId: string;
}

export interface EngagementPanelSectionListRendererHeader {
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
  sortFilterSubMenuRenderer?: MenuSortFilterSubMenuRenderer;
  menuRenderer?: FluffyMenuRenderer;
}

export interface FluffyMenuRenderer {
  items: TentacledItem[];
  trackingParams: string;
  accessibility: DisabledAccessibilityData;
}

export interface TentacledItem {
  menuServiceItemRenderer: TentacledMenuServiceItemRenderer;
}

export interface TentacledMenuServiceItemRenderer {
  text: Subtitle;
  serviceEndpoint: OnResponseReceivedEndpoint;
  trackingParams: string;
}

export interface OnResponseReceivedEndpoint {
  clickTrackingParams: string;
  commandMetadata: OnUnsubscribeEndpointCommandMetadata;
  signalServiceEndpoint: CommandSignalServiceEndpoint;
}

export interface MenuSortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  icon: Icon;
  accessibility: DisabledAccessibilityData;
  trackingParams: string;
}

export interface ResponseFrameworkUpdates {
  entityBatchUpdate: EntityBatchUpdate;
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
}

export interface AddToMenu {
  menuRenderer: AddToMenuMenuRenderer;
}

export interface AddToMenuMenuRenderer {
  items: StickyItem[];
  trackingParams: string;
}

export interface StickyItem {
  menuServiceItemRenderer: StickyMenuServiceItemRenderer;
}

export interface StickyMenuServiceItemRenderer {
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
  size: SizeTypeEnum;
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
  command: OnResponseReceivedEndpoint;
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
  endpoint: TopicLinkRendererEndpoint;
  trackingParams: string;
  overrideEntityKey: string;
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
  style?: ButtonRendererStyle;
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
