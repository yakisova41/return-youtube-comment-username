import {
  type ConfinuationItem,
  type CommentRenderer as AppendCommentRenderer,
} from "./AppendContinuationItemsAction";

export interface YtCreateCommentAction {
  clickTrackingParams: string;
  createCommentAction: CreateCommentAction;
}
export interface YtCreateCommentReplyAction {
  clickTrackingParams: string;
  createCommentReplyAction: {
    contents: ReplyContents;
  };
}

export interface CreateCommentAction {
  contents: Contents;
}

export interface Contents {
  commentThreadRenderer: ConfinuationItem;
}

export interface ReplyContents {
  commentRenderer: AppendCommentRenderer;
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
  authorThumbnail: OrThumbnail;
  authorEndpoint: AuthorEndpoint;
  contentText: ContentText;
  publishedTimeText: PublishedTimeText;
  isLiked: boolean;
  actionMenu: ActionMenu;
  commentId: string;
  actionButtons: ActionButtons;
  authorIsChannelOwner: boolean;
  currentUserReplyThumbnail: CurrentUserReplyThumbnail;
  editableContentText: ContentText;
  voteStatus: string;
  trackingParams: string;
  viewerIsAuthor: boolean;
  expandButton: Button;
  collapseButton: Button;
  authorCommentBadge: AuthorCommentBadge;
  loggingDirectives: LoggingDirectives;
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
  creatorThumbnail: OrThumbnail;
  heartIcon: Icon;
  heartColor: HeartColor;
  heartedTooltip: string;
  isHearted: boolean;
  isEnabled: boolean;
  heartEndpoint: HeartEndpoint;
  unheartEndpoint: HeartEndpoint;
  heartedAccessibility: Accessibility;
  unheartedAccessibility: Accessibility;
  kennedyHeartColorString: string;
  unheartedTooltip: string;
}

export interface OrThumbnail {
  thumbnails: Thumbnail[];
  accessibility: Accessibility;
}

export interface Accessibility {
  accessibilityData: MenuPopupAccessibility;
}

export interface MenuPopupAccessibility {
  label: string;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface HeartColor {
  basicColorPaletteData: HeartColorBasicColorPaletteData;
}

export interface HeartColorBasicColorPaletteData {
  foregroundTitleColor: number;
}

export interface HeartEndpoint {
  clickTrackingParams: string;
  commandMetadata: HeartEndpointCommandMetadata;
  performCommentActionEndpoint: HeartEndpointPerformCommentActionEndpoint;
}

export interface HeartEndpointCommandMetadata {
  webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
  sendPost: boolean;
  apiUrl: string;
}

export interface HeartEndpointPerformCommentActionEndpoint {
  action: string;
}

export interface Icon {
  iconType: string;
}

export interface DislikeButton {
  toggleButtonRenderer: DislikeButtonToggleButtonRenderer;
}

export interface DislikeButtonToggleButtonRenderer {
  style: Style;
  size: Size;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: ServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: Style;
  accessibilityData: Accessibility;
  toggledAccessibilityData: Accessibility;
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

export interface Size {
  sizeType: string;
}

export interface Style {
  styleType: string;
}

export interface LikeButton {
  toggleButtonRenderer: LikeButtonToggleButtonRenderer;
}

export interface LikeButtonToggleButtonRenderer {
  style: Style;
  size: Size;
  isToggled: boolean;
  isDisabled: boolean;
  defaultIcon: Icon;
  defaultServiceEndpoint: DefaultServiceEndpoint;
  toggledServiceEndpoint: ServiceEndpoint;
  trackingParams: string;
  defaultTooltip: string;
  toggledTooltip: string;
  toggledStyle: Style;
  accessibilityData: Accessibility;
  toggledAccessibilityData: Accessibility;
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
  accessibility: Accessibility;
  simpleText: string;
}

export interface CommentReplyDialogRenderer {
  replyButton: Button;
  cancelButton: CancelButton;
  authorThumbnail: OrThumbnail;
  placeholderText: ContentText;
  errorMessage: ContentText;
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
  style: string;
  size: string;
  text: ContentText;
  navigationEndpoint?: ButtonRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: ServiceEndpointClass;
  accessibility?: MenuPopupAccessibility;
}

export interface Button {
  buttonRenderer: CollapseButtonButtonRenderer;
}

export interface CancelButton {
  buttonRenderer: PurpleButtonRenderer;
}

export interface PurpleButtonRenderer {
  text: ContentText;
  trackingParams: string;
}

export interface ContentText {
  runs: ContentTextRun[];
}

export interface ContentTextRun {
  text: string;
}

export interface EmojiButton {
  buttonRenderer: EmojiButtonButtonRenderer;
}

export interface EmojiButtonButtonRenderer {
  size: string;
  icon: Icon;
  trackingParams: string;
  accessibilityData: Accessibility;
}

export interface EmojiPicker {
  emojiPickerRenderer: EmojiPickerRenderer;
}

export interface EmojiPickerRenderer {
  id: string;
  categories: Category[];
  categoryButtons: CategoryButton[];
  searchPlaceholderText: ContentText;
  searchNoResultsText: ContentText;
  pickSkinToneText: ContentText;
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
  accessibility: Accessibility;
  targetId?: string;
}

export interface PurpleCommandMetadata {
  webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
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

export interface ActionMenu {
  menuRenderer: MenuRenderer;
}

export interface MenuRenderer {
  items: Item[];
  trackingParams: string;
  accessibility: Accessibility;
  menuPopupAccessibility: MenuPopupAccessibility;
}

export interface Item {
  menuNavigationItemRenderer: MenuNavigationItemRenderer;
}

export interface MenuNavigationItemRenderer {
  text: ContentText;
  icon: Icon;
  navigationEndpoint: MenuNavigationItemRendererNavigationEndpoint;
  trackingParams: string;
}

export interface MenuNavigationItemRendererNavigationEndpoint {
  clickTrackingParams: string;
  showEngagementPanelEndpoint?: ShowEngagementPanelEndpoint;
  commandMetadata?: PurpleCommandMetadata;
  updateCommentDialogEndpoint?: UpdateCommentDialogEndpoint;
  confirmDialogEndpoint?: ConfirmDialogEndpoint;
}

export interface ConfirmDialogEndpoint {
  content: Content;
}

export interface Content {
  confirmDialogRenderer: ConfirmDialogRenderer;
}

export interface ConfirmDialogRenderer {
  title: ContentText;
  trackingParams: string;
  dialogMessages: ContentText[];
  confirmButton: Button;
  cancelButton: Button;
  primaryIsCancel: boolean;
}

export interface ShowEngagementPanelEndpoint {
  identifier: Identifier;
  globalConfiguration: GlobalConfiguration;
  engagementPanelPresentationConfigs: EngagementPanelPresentationConfigs;
}

export interface EngagementPanelPresentationConfigs {
  engagementPanelPopupPresentationConfig: EngagementPanelPopupPresentationConfig;
}

export interface EngagementPanelPopupPresentationConfig {
  popupType: string;
}

export interface GlobalConfiguration {
  params: string;
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
  editableText: ContentText;
  authorThumbnail: OrThumbnail;
  submitButton: Button;
  cancelButton: CancelButton;
  placeholderText: ContentText;
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

export interface AuthorEndpointCommandMetadata {
  webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
  url: string;
  webPageType: string;
  rootVe: number;
  apiUrl?: string;
}

export interface Color {
  basicColorPaletteData: ColorBasicColorPaletteData;
}

export interface ColorBasicColorPaletteData {
  backgroundColor: number;
  foregroundTitleColor: number;
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
  text: string;
  navigationEndpoint: RunNavigationEndpoint;
}

export interface RunNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  watchEndpoint: WatchEndpoint;
}

export interface WatchEndpoint {
  videoId: string;
  params: string;
}
