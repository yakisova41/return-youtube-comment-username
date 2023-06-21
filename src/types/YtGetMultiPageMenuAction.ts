import { type ContinuationItems } from "./AppendContinuationItemsAction";

export interface YtGetMultiPageMenuAction {
  clickTrackingParams: string;
  getMultiPageMenuAction: GetMultiPageMenuAction;
}

export interface GetMultiPageMenuAction {
  menu: Menu;
}

export interface Menu {
  multiPageMenuRenderer: MultiPageMenuRenderer;
}

export interface MultiPageMenuRenderer {
  header: MultiPageMenuRendererHeader;
  sections: Section[];
  trackingParams: string;
  style: string;
}

export interface MultiPageMenuRendererHeader {
  simpleMenuHeaderRenderer: SimpleMenuHeaderRenderer;
}

export interface SimpleMenuHeaderRenderer {
  backButton: BackButton;
  title: Title;
}

export interface BackButton {
  buttonRenderer: BackButtonButtonRenderer;
}

export interface BackButtonButtonRenderer {
  style: string;
  size: SizeEnum;
  isDisabled: boolean;
  icon: Icon;
  accessibility: Accessibility;
  trackingParams: string;
  accessibilityData: AccessibilityData;
}

export interface Accessibility {
  label: string;
}

export interface AccessibilityData {
  accessibilityData: Accessibility;
}

export interface Icon {
  iconType: string;
}

export enum SizeEnum {
  SizeDefault = "SIZE_DEFAULT",
}

export interface Title {
  runs: TitleRun[];
}

export interface TitleRun {
  text: string;
}

export interface Section {
  commentVideoThumbnailHeaderRenderer?: CommentVideoThumbnailHeaderRenderer;
  itemSectionRenderer?: ItemSectionRenderer;
}

export interface CommentVideoThumbnailHeaderRenderer {
  title: Title;
  thumbnail: CurrentUserReplyThumbnailClass;
  navigationEndpoint: CommentVideoThumbnailHeaderRendererNavigationEndpoint;
  showSeparator: boolean;
  trackingParams: string;
}

export interface CommentVideoThumbnailHeaderRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  watchEndpoint: WatchEndpoint;
}

export interface AuthorEndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  url: string;
  webPageType: string;
  rootVe: number;
  apiUrl?: string;
}

export interface WatchEndpoint {
  videoId: string;
  params: string;
}

export interface CurrentUserReplyThumbnailClass {
  thumbnails: ThumbnailElement[];
}

export interface ThumbnailElement {
  url: string;
  width: number;
  height: number;
}

export interface ItemSectionRenderer {
  contents: ContinuationItems;
  trackingParams: string;
  header: ItemSectionRendererHeader;
  sectionIdentifier: string;
  targetId: string;
}

export interface ContentElement {
  commentThreadRenderer: CommentThreadRenderer;
}

export interface CommentThreadRenderer {
  comment: Comment;
  trackingParams: string;
  renderingPriority: string;
  isModeratedElqComment: boolean;
  loggingDirectives: LoggingDirectives;
}

export interface Comment {
  commentRenderer: CommentRenderer;
}

export interface CommentRenderer {
  authorText: AuthorText;
  authorThumbnail: Image;
  authorEndpoint: AuthorEndpoint;
  contentText: Title;
  publishedTimeText: PublishedTimeText;
  isLiked: boolean;
  actionMenu: ActionMenu;
  commentId: string;
  actionButtons: ActionButtons;
  authorIsChannelOwner: boolean;
  currentUserReplyThumbnail: CurrentUserReplyThumbnailClass;
  voteStatus: string;
  trackingParams: string;
  expandButton: Button;
  collapseButton: Button;
  linkedCommentBadge?: LinkedCommentBadge;
  loggingDirectives: LoggingDirectives;
  editableContentText?: Title;
  viewerIsAuthor?: boolean;
  authorCommentBadge?: AuthorCommentBadge;
}

export interface ActionButtons {
  commentActionButtonsRenderer: CommentActionButtonsRenderer;
}

export interface CommentActionButtonsRenderer {
  likeButton: LikeButton;
  replyButton: Button;
  dislikeButton: DislikeButton;
  trackingParams: string;
  creatorHeart: CreatorHeart;
  protoCreationMs: string;
  style: string;
}

export interface CreatorHeart {
  creatorHeartRenderer: CreatorHeartRenderer;
}

export interface CreatorHeartRenderer {
  creatorThumbnail: Image;
  heartIcon: Icon;
  heartColor: HeartColor;
  heartedTooltip: string;
  isHearted: boolean;
  isEnabled: boolean;
  heartEndpoint: Endpoint;
  unheartEndpoint: Endpoint;
  heartedAccessibility: AccessibilityData;
  unheartedAccessibility: AccessibilityData;
  kennedyHeartColorString: string;
  unheartedTooltip: string;
}

export interface Image {
  thumbnails: ThumbnailElement[];
  accessibility: AccessibilityData;
}

export interface HeartColor {
  basicColorPaletteData: HeartColorBasicColorPaletteData;
}

export interface HeartColorBasicColorPaletteData {
  foregroundTitleColor: number;
}

export interface Endpoint {
  clickTrackingParams: string;
  commandMetadata: HeartEndpointCommandMetadata;
  performCommentActionEndpoint?: HeartEndpointPerformCommentActionEndpoint;
  getReportFormEndpoint?: GetReportFormEndpoint;
}

export interface HeartEndpointCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
  sendPost: boolean;
  apiUrl: APIURL;
}

export enum APIURL {
  YoutubeiV1CommentCreateCommentReply = "/youtubei/v1/comment/create_comment_reply",
  YoutubeiV1CommentPerformCommentAction = "/youtubei/v1/comment/perform_comment_action",
  YoutubeiV1CommentUpdateComment = "/youtubei/v1/comment/update_comment",
  YoutubeiV1FlagGetForm = "/youtubei/v1/flag/get_form",
}

export interface GetReportFormEndpoint {
  params: string;
}

export interface HeartEndpointPerformCommentActionEndpoint {
  action: string;
}

export interface DislikeButton {
  toggleButtonRenderer: DislikeButtonToggleButtonRenderer;
}

export interface DislikeButtonToggleButtonRenderer {
  style: StyleClass;
  size: SizeClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: StyleClass;
  accessibilityData: AccessibilityData;
  toggledAccessibilityData: AccessibilityData;
}

export interface ServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: HeartEndpointCommandMetadata;
  performCommentActionEndpoint: ToggledServiceEndpointPerformCommentActionEndpoint;
}

export interface ToggledServiceEndpointPerformCommentActionEndpoint {
  action: string;
  clientActions: PurpleClientAction[];
}

export interface PurpleClientAction {
  clickTrackingParams: string;
  updateCommentVoteAction: PurpleUpdateCommentVoteAction;
}

export interface PurpleUpdateCommentVoteAction {
  voteStatus: string;
}

export interface SizeClass {
  sizeType: SizeEnum;
}

export interface StyleClass {
  styleType: string;
}

export interface LikeButton {
  toggleButtonRenderer: LikeButtonToggleButtonRenderer;
}

export interface LikeButtonToggleButtonRenderer {
  style: StyleClass;
  size: SizeClass;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: DefaultServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: StyleClass;
  accessibilityData: AccessibilityData;
  toggledAccessibilityData: AccessibilityData;
}

export interface DefaultServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: HeartEndpointCommandMetadata;
  performCommentActionEndpoint: PurplePerformCommentActionEndpoint;
}

export interface PurplePerformCommentActionEndpoint {
  action: string;
  clientActions: FluffyClientAction[];
}

export interface FluffyClientAction {
  clickTrackingParams: string;
  updateCommentVoteAction: FluffyUpdateCommentVoteAction;
}

export interface FluffyUpdateCommentVoteAction {
  voteCount: VoteCount;
  voteStatus: string;
}

export interface VoteCount {
  accessibility: AccessibilityData;
  simpleText: string;
}

export interface CommentReplyDialogRenderer {
  replyButton: Button;
  cancelButton: CancelButton;
  authorThumbnail: Image;
  placeholderText: Title;
  errorMessage: Title;
  emojiButton: EmojiButton;
  emojiPicker: EmojiPicker;
  aadcGuidelinesStateEntityKey: string;
}

export interface CreateCommentReplyDialogEndpointDialog {
  commentReplyDialogRenderer: CommentReplyDialogRenderer;
}

export interface CreateCommentReplyDialogEndpoint {
  dialog: CreateCommentReplyDialogEndpointDialog;
}

export interface ButtonRendererNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: PurpleCommandMetadata;
  createCommentReplyDialogEndpoint: CreateCommentReplyDialogEndpoint;
}

export interface CollapseButtonButtonRenderer {
  style: StyleEnum;
  size: SizeEnum;
  text: Title;
  navigationEndpoint?: ButtonRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: ServiceEndpointClass;
  accessibility?: Accessibility;
}

export interface Button {
  buttonRenderer: CollapseButtonButtonRenderer;
}

export interface CancelButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  text: Title;
  trackingParams: string;
}

export interface EmojiButton {
  buttonRenderer: EmojiButtonButtonRenderer;
}

export interface EmojiButtonButtonRenderer {
  size: string;
  icon: Icon;
  trackingParams: string;
  accessibilityData: AccessibilityData;
}

export interface EmojiPicker {
  emojiPickerRenderer: EmojiPickerRenderer;
}

export interface EmojiPickerRenderer {
  id: string;
  categories: Category[];
  categoryButtons: CategoryButton[];
  searchPlaceholderText: Title;
  searchNoResultsText: Title;
  pickSkinToneText: Title;
  trackingParams: string;
  clearSearchLabel: string;
  skinToneGenericLabel: string;
  skinToneLightLabel: string;
  skinToneMediumLightLabel: string;
  skinToneMediumLabel: string;
  skinToneMediumDarkLabel: string;
  skinToneDarkLabel: string;
}

export interface Category {
  emojiPickerCategoryRenderer: EmojiPickerCategoryRenderer;
}

export interface EmojiPickerCategoryRenderer {
  categoryId: string;
  title: AuthorText;
  emojiIds: string[];
  trackingParams: string;
  categoryType: CategoryType;
  imageLoadingLazy?: boolean;
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
  categoryId: string;
  icon: Icon;
  tooltip: string;
  accessibility: AccessibilityData;
  targetId?: string;
}

export interface PurpleCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  ignoreNavigation: boolean;
}

export interface ServiceEndpointClass {
  clickTrackingParams: string;
  commandMetadata: HeartEndpointCommandMetadata;
  createCommentReplyEndpoint?: CreateCommentReplyEndpoint;
  performCommentActionEndpoint?: HeartEndpointPerformCommentActionEndpoint;
  updateCommentEndpoint?: UpdateCommentEndpoint;
}

export interface CreateCommentReplyEndpoint {
  createReplyParams: string;
}

export interface UpdateCommentEndpoint {
  updateCommentParams: string;
}

export enum StyleEnum {
  StyleBlueText = "STYLE_BLUE_TEXT",
  StylePrimary = "STYLE_PRIMARY",
  StyleText = "STYLE_TEXT",
}

export interface ActionMenu {
  menuRenderer: MenuRenderer;
}

export interface MenuRenderer {
  items: Item[];
  trackingParams: string;
  accessibility: AccessibilityData;
  menuPopupAccessibility: Accessibility;
}

export interface Item {
  menuNavigationItemRenderer?: MenuItemRenderer;
  menuServiceItemRenderer?: MenuItemRenderer;
}

export interface MenuItemRenderer {
  text: Title;
  icon: Icon;
  navigationEndpoint?: MenuNavigationItemRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: Endpoint;
}

export interface MenuNavigationItemRendererNavigationEndpoint {
  clickTrackingParams: string;
  showEngagementPanelEndpoint?: ShowEngagementPanelEndpoint;
  commandMetadata?: PurpleCommandMetadata;
  updateCommentDialogEndpoint?: UpdateCommentDialogEndpoint;
  confirmDialogEndpoint?: ConfirmDialogEndpoint;
}

export interface ConfirmDialogEndpoint {
  content: ConfirmDialogEndpointContent;
}

export interface ConfirmDialogEndpointContent {
  confirmDialogRenderer: ConfirmDialogRenderer;
}

export interface ConfirmDialogRenderer {
  title: Title;
  trackingParams: string;
  dialogMessages: Title[];
  confirmButton: Button;
  cancelButton: Button;
  primaryIsCancel: boolean;
}

export interface ShowEngagementPanelEndpoint {
  identifier: Identifier;
  globalConfiguration: GetReportFormEndpoint;
  engagementPanelPresentationConfigs: EngagementPanelPresentationConfigs;
}

export interface EngagementPanelPresentationConfigs {
  engagementPanelPopupPresentationConfig: EngagementPanelPopupPresentationConfig;
}

export interface EngagementPanelPopupPresentationConfig {
  popupType: string;
}

export interface Identifier {
  tag: string;
}

export interface UpdateCommentDialogEndpoint {
  dialog: UpdateCommentDialogEndpointDialog;
  targetId: string;
}

export interface UpdateCommentDialogEndpointDialog {
  commentDialogRenderer: CommentDialogRenderer;
}

export interface CommentDialogRenderer {
  editableText: Title;
  authorThumbnail: Image;
  submitButton: Button;
  cancelButton: CancelButton;
  placeholderText: Title;
  emojiButton: EmojiButton;
  emojiPicker: EmojiPicker;
}

export interface AuthorCommentBadge {
  authorCommentBadgeRenderer: AuthorCommentBadgeRenderer;
}

export interface AuthorCommentBadgeRenderer {
  color: Color;
  authorText: AuthorText;
  authorEndpoint: AuthorEndpoint;
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

export interface Color {
  basicColorPaletteData: ColorBasicColorPaletteData;
}

export interface ColorBasicColorPaletteData {
  backgroundColor: number;
  foregroundTitleColor: number;
}

export interface LinkedCommentBadge {
  metadataBadgeRenderer: MetadataBadgeRenderer;
}

export interface MetadataBadgeRenderer {
  style: string;
  label: string;
  trackingParams: string;
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
  text: string;
  navigationEndpoint: CommentVideoThumbnailHeaderRendererNavigationEndpoint;
}

export interface ItemSectionRendererHeader {
  commentsHeaderRenderer: CommentsHeaderRenderer;
}

export interface CommentsHeaderRenderer {
  trackingParams: string;
  customEmojis: CustomEmoji[];
  unicodeEmojisUrl: string;
}

export interface CustomEmoji {
  emojiId: string;
  shortcuts: string[];
  searchTerms: string[];
  image: Image;
  isCustomEmoji: boolean;
  index: number;
}
