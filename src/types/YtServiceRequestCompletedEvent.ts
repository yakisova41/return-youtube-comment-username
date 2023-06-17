export interface YtServiceRequestCompletedEvent {
  data: Data;
  actions: Action[];
}

export interface Action {
  clickTrackingParams: string;
  reloadContinuationItemsCommand: ReloadContinuationItemsCommand;
}

export interface ReloadContinuationItemsCommand {
  targetId: string;
  continuationItems: ContinuationItem[];
  slot: string;
}

export interface ContinuationItem {
  commentsHeaderRenderer?: CommentsHeaderRenderer;
  commentThreadRenderer?: CommentThreadRenderer;
  continuationItemRenderer?: ContinuationItemRenderer;
}

export interface CommentThreadRenderer {
  comment: Comment;
  replies?: Replies;
  trackingParams: string;
  renderingPriority: RenderingPriority;
  isModeratedElqComment: boolean;
  loggingDirectives: LoggingDirectives;
}

export interface Comment {
  commentRenderer: CommentRenderer;
}

export interface CommentRenderer {
  authorText: AuthorText;
  authorThumbnail: AuthorThumbnail;
  authorEndpoint: AuthorEndpoint;
  contentText: ContentText;
  publishedTimeText: PublishedTimeText;
  isLiked: boolean;
  actionMenu: ActionMenu;
  commentId: string;
  actionButtons: ActionButtons;
  authorIsChannelOwner: boolean;
  currentUserReplyThumbnail: CurrentUserReplyThumbnail;
  voteStatus: VoteStatus;
  trackingParams: string;
  voteCount: VoteCount;
  expandButton: Button;
  collapseButton: Button;
  replyCount?: number;
  loggingDirectives: LoggingDirectives;
}

export interface ActionButtons {
  commentActionButtonsRenderer: CommentActionButtonsRenderer;
}

export interface CommentActionButtonsRenderer {
  likeButton: LikeButton;
  replyButton: Button;
  dislikeButton: LikeButton;
  trackingParams: string;
  protoCreationMs: string;
  style: CommentActionButtonsRendererStyle;
}

export interface LikeButton {
  toggleButtonRenderer: ToggleButtonRenderer;
}

export interface ToggleButtonRenderer {
  style: StyleClass;
  size: SizeClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: DefaultTooltip;
  toggledTooltip: ToggledTooltip;
  toggledStyle: StyleClass;
  accessibilityData: Accessibility;
  toggledAccessibilityData: Accessibility;
}

export interface Accessibility {
  accessibilityData: AccessibilityData;
}

export interface AccessibilityData {
  label: string;
}

export interface Icon {
  iconType: IconType;
}

export enum IconType {
  ArrowDropDown = "ARROW_DROP_DOWN",
  ArrowDropUp = "ARROW_DROP_UP",
  Dislike = "DISLIKE",
  Emoji = "EMOJI",
  EmojiActivities = "EMOJI_ACTIVITIES",
  EmojiFood = "EMOJI_FOOD",
  EmojiNature = "EMOJI_NATURE",
  EmojiObjects = "EMOJI_OBJECTS",
  EmojiPeople = "EMOJI_PEOPLE",
  EmojiSymbols = "EMOJI_SYMBOLS",
  EmojiTravel = "EMOJI_TRAVEL",
  Flag = "FLAG",
  Like = "LIKE",
  Sort = "SORT",
  SparkleFilled = "SPARKLE_FILLED",
  VideoYoutube = "VIDEO_YOUTUBE",
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  performCommentActionEndpoint: PerformCommentActionEndpoint;
}

export interface DefaultServiceEndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  sendPost: boolean;
  apiUrl: PurpleAPIURL;
}

export enum PurpleAPIURL {
  YoutubeiV1CommentCreateComment = "/youtubei/v1/comment/create_comment",
  YoutubeiV1CommentCreateCommentReply = "/youtubei/v1/comment/create_comment_reply",
  YoutubeiV1CommentPerformCommentAction = "/youtubei/v1/comment/perform_comment_action",
  YoutubeiV1FlagGetForm = "/youtubei/v1/flag/get_form",
  YoutubeiV1Next = "/youtubei/v1/next",
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
  voteCount: VoteCount;
  voteStatus: VoteStatus;
}

export interface VoteCount {
  accessibility: Accessibility;
  simpleText: string;
}

export enum VoteStatus {
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

export enum ToggledTooltip {
  低評価を取り消す = "低評価を取り消す",
  高評価を取り消し = "高評価を取り消し",
}

export interface CommentReplyDialogRenderer {
  replyButton: Button;
  cancelButton: CancelButton;
  authorThumbnail: AuthorThumbnail;
  placeholderText: CommentsCount;
  errorMessage: CommentsCount;
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

export interface CollapseButtonButtonRenderer {
  style: ButtonRendererStyle;
  size: SizeTypeEnum;
  text: CommentsCount;
  navigationEndpoint?: ButtonRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: PurpleServiceEndpoint;
  accessibility?: AccessibilityData;
  accessibilityData?: Accessibility;
}

export interface Button {
  buttonRenderer: CollapseButtonButtonRenderer;
}

export enum AadcGuidelinesStateEntityKey {
  Egw3OTMXNTkxMTc1MTEgmQIoAQ3D3D = "Egw3OTMxNTkxMTc1MTEgmQIoAQ%3D%3D",
}

export interface AuthorThumbnail {
  thumbnails: Thumbnail[];
  accessibility: Accessibility;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface CancelButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  text: CommentsCount;
  trackingParams: string;
}

export interface CommentsCount {
  runs: CommentsCountRun[];
}

export interface CommentsCountRun {
  text: string;
}

export interface EmojiButton {
  buttonRenderer: EmojiButtonButtonRenderer;
}

export interface EmojiButtonButtonRenderer {
  size: PurpleSize;
  icon: Icon;
  trackingParams: string;
  accessibilityData: Accessibility;
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
  searchPlaceholderText: CommentsCount;
  searchNoResultsText: CommentsCount;
  pickSkinToneText: CommentsCount;
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
  title: AuthorText;
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

export interface AuthorText {
  simpleText: string;
}

export interface CategoryButton {
  emojiPickerCategoryButtonRenderer: EmojiPickerCategoryButtonRenderer;
}

export interface EmojiPickerCategoryButtonRenderer {
  categoryId: CategoryID;
  icon: Icon;
  tooltip: Tooltip;
  accessibility: Accessibility;
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
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface PurpleServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  createCommentReplyEndpoint?: CreateCommentReplyEndpoint;
  createCommentEndpoint?: CreateCommentEndpoint;
}

export interface CreateCommentEndpoint {
  createCommentParams: string;
}

export interface CreateCommentReplyEndpoint {
  createReplyParams: string;
}

export enum ButtonRendererStyle {
  StylePrimary = "STYLE_PRIMARY",
  StyleText = "STYLE_TEXT",
}

export enum CommentActionButtonsRendererStyle {
  CommentActionButtonStyleTypeDesktopToolbar = "COMMENT_ACTION_BUTTON_STYLE_TYPE_DESKTOP_TOOLBAR",
}

export interface ActionMenu {
  menuRenderer: MenuRenderer;
}

export interface MenuRenderer {
  items: Item[];
  trackingParams: string;
  accessibility: Accessibility;
  menuPopupAccessibility: AccessibilityData;
}

export interface Item {
  menuServiceItemRenderer: Renderer;
}

export interface Renderer {
  text: CommentsCount;
  icon: Icon;
  serviceEndpoint?: MenuServiceItemRendererServiceEndpoint;
  trackingParams: string;
  iconPosition?: IconPosition;
}

export enum IconPosition {
  ButtonIconPositionTypeLeftOfText = "BUTTON_ICON_POSITION_TYPE_LEFT_OF_TEXT",
}

export interface MenuServiceItemRendererServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  getReportFormEndpoint: GetReportFormEndpoint;
}

export interface GetReportFormEndpoint {
  params: string;
}

export interface AuthorEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  browseEndpoint: BrowseEndpoint;
}

export interface BrowseEndpoint {
  browseId: string;
  canonicalBaseUrl: string;
}

export interface AuthorEndpointCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  url: string;
  webPageType: WebPageType;
  rootVe: number;
  apiUrl?: FluffyAPIURL;
}

export enum FluffyAPIURL {
  YoutubeiV1Browse = "/youtubei/v1/browse",
}

export enum WebPageType {
  WebPageTypeChannel = "WEB_PAGE_TYPE_CHANNEL",
  WebPageTypeWatch = "WEB_PAGE_TYPE_WATCH",
}

export interface ContentText {
  runs: ContentTextRun[];
}

export interface ContentTextRun {
  text: string;
  navigationEndpoint?: PurpleNavigationEndpoint;
}

export interface PurpleNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  watchEndpoint: PurpleWatchEndpoint;
}

export interface PurpleWatchEndpoint {
  videoId: VideoID;
  startTimeSeconds: number;
}

export enum VideoID {
  IqGhCfwuYKM = "IqGhCfwuYKM",
}

export interface CurrentUserReplyThumbnail {
  thumbnails: Thumbnail[];
}

export interface LoggingDirectives {
  trackingParams: string;
  visibility: Visibility;
  enableDisplayloggerExperiment: boolean;
}

export interface Visibility {
  types: string;
}

export interface PublishedTimeText {
  runs: PublishedTimeTextRun[];
}

export interface PublishedTimeTextRun {
  text: Text;
  navigationEndpoint: FluffyNavigationEndpoint;
}

export interface FluffyNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  watchEndpoint: FluffyWatchEndpoint;
}

export interface FluffyWatchEndpoint {
  videoId: VideoID;
  params: string;
}

export enum Text {
  The10か月前 = "10 か月前",
  The10か月前編集済み = "10 か月前（編集済み）",
  The8か月前 = "8 か月前",
}

export enum RenderingPriority {
  RenderingPriorityUnknown = "RENDERING_PRIORITY_UNKNOWN",
}

export interface Replies {
  commentRepliesRenderer: CommentRepliesRenderer;
}

export interface CommentRepliesRenderer {
  contents: Content[];
  trackingParams: string;
  viewReplies: HideRepliesClass;
  hideReplies: HideRepliesClass;
  targetId: string;
}

export interface Content {
  continuationItemRenderer: ContinuationItemRenderer;
}

export interface ContinuationItemRenderer {
  trigger: Trigger;
  continuationEndpoint: ContinuationEndpoint;
}

export interface ContinuationEndpoint {
  clickTrackingParams: string;
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  continuationCommand: ContinuationEndpointContinuationCommand;
}

export interface ContinuationEndpointContinuationCommand {
  token: string;
  request: Request;
}

export enum Request {
  ContinuationRequestTypeWatchNext = "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
}

export enum Trigger {
  ContinuationTriggerOnItemShown = "CONTINUATION_TRIGGER_ON_ITEM_SHOWN",
}

export interface HideRepliesClass {
  buttonRenderer: Renderer;
}

export interface CommentsHeaderRenderer {
  countText: CommentsCount;
  createRenderer: CreateRenderer;
  sortMenu: SortMenu;
  trackingParams: string;
  titleText: CommentsCount;
  commentsCount: CommentsCount;
  showSeparator: boolean;
  customEmojis: CustomEmoji[];
  unicodeEmojisUrl: string;
  loggingDirectives: LoggingDirectives;
}

export interface CreateRenderer {
  commentSimpleboxRenderer: CommentSimpleboxRenderer;
}

export interface CommentSimpleboxRenderer {
  submitButton: Button;
  cancelButton: Button;
  authorThumbnail: AuthorThumbnail;
  placeholderText: CommentsCount;
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
  image: AuthorThumbnail;
  isCustomEmoji: boolean;
  index: number;
}

export interface SortMenu {
  sortFilterSubMenuRenderer: SortFilterSubMenuRenderer;
}

export interface SortFilterSubMenuRenderer {
  subMenuItems: SubMenuItem[];
  title: string;
  icon: Icon;
  accessibility: Accessibility;
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
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  continuationCommand: ServiceEndpointContinuationCommand;
}

export interface ServiceEndpointContinuationCommand {
  token: string;
  request: Request;
  command: Command;
}

export interface Command {
  clickTrackingParams: string;
  showReloadUiCommand: ShowReloadUICommand;
}

export interface ShowReloadUICommand {
  targetId: string;
}

export interface Data {
  responseContext: ResponseContext;
  trackingParams: string;
  onResponseReceivedEndpoints: Action[];
}

export interface ResponseContext {
  serviceTrackingParams: ServiceTrackingParam[];
  mainAppWebResponseContext: MainAppWebResponseContext;
  webResponseContextExtensionData: WebResponseContextExtensionData;
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

export interface WebResponseContextExtensionData {
  hasDecorated: boolean;
}
