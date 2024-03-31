export type ContinuationItems = Array<{
  commentThreadRenderer: ConfinuationItem | ConfinuationItemV2;
}>;

export type ContinuationItemsV2 = Array<{
  commentThreadRenderer: ConfinuationItemV2;
}>;

export type ReplyContinuationItems = Array<{
  commentRenderer: CommentRenderer;
}>;

export type ReplyContinuationItemsV2 = Array<{
  commentViewModel: CommentViewModelCommentViewModel;
}>;

export function isReplyContinuationItemsV1(
  obj: ReplyContinuationItems | ReplyContinuationItemsV2,
): obj is ReplyContinuationItems {
  return Object.hasOwn(obj[0], "commentRenderer");
}

export function isReplyContinuationItemsV2(
  obj: ReplyContinuationItems | ReplyContinuationItemsV2,
): obj is ReplyContinuationItemsV2 {
  return Object.hasOwn(obj[0], "commentViewModel");
}

/**
 * The format of the ConfinuationItem has changed since the version of 02/03/2024
 */
export interface ConfinuationItemV2 {
  trackingParams: string;
  renderingPriority: string;
  isModeratedElqComment: boolean;
  commentViewModel: CommentViewModel;
  loggingDirectives: LoggingDirectives;
  replies?: {
    commentRepliesRenderer: {
      teaserContents: ReplyContinuationItems | ReplyContinuationItemsV2;
    };
  };
}

export function isConfinuationItemV2(
  obj: ConfinuationItem | ConfinuationItemV2,
): obj is ConfinuationItemV2 {
  return Object.hasOwn(obj, "commentViewModel");
}

export interface CommentViewModel {
  commentViewModel: CommentViewModelCommentViewModel;
}

export interface CommentViewModelCommentViewModel {
  commentKey: string;
  sharedKey: string;
  toolbarStateKey: string;
  toolbarSurfaceKey: string;
  commentId: string;
  commentSurfaceKey: string;
  rendererContext: RendererContext;
}

export interface RendererContext {
  loggingContext: LoggingContext;
}

export interface LoggingContext {
  loggingDirectives: LoggingDirectives;
}

export interface LoggingDirectives {
  trackingParams: string;
  visibility: Visibility;
  enableDisplayloggerExperiment: boolean;
}

export interface Visibility {
  types: string;
}
/**========================== */

export interface ConfinuationItem {
  comment: Comment;
  trackingParams: string;
  renderingPriority: string;
  isModeratedElqComment: boolean;
  loggingDirectives: LoggingDirectives;
  replies?: {
    commentRepliesRenderer: {
      teaserContents: Array<{
        commentRenderer: CommentRenderer;
      }>;
    };
  };
}

export function isConfinuationItemV1(
  obj: ConfinuationItem | ConfinuationItemV2,
): obj is ConfinuationItem {
  return Object.hasOwn(obj, "comment");
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
  voteStatus: string;
  trackingParams: string;
  voteCount: VoteCount;
  expandButton: Button;
  collapseButton: Button;
  loggingDirectives: LoggingDirectives;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authorCommentBadge?: any;
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
  style: string;
}

export interface LikeButton {
  toggleButtonRenderer: ToggleButtonRenderer;
}

export interface ToggleButtonRenderer {
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

export interface Accessibility {
  accessibilityData: MenuPopupAccessibility;
}

export interface MenuPopupAccessibility {
  label: string;
}

export interface Icon {
  iconType: string;
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
  apiUrl: string;
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
  voteStatus: string;
}

export interface VoteCount {
  accessibility: Accessibility;
  simpleText: string;
}

export interface Size {
  sizeType: string;
}

export interface Style {
  styleType: string;
}

export interface CommentReplyDialogRenderer {
  replyButton: Button;
  cancelButton: CancelButton;
  authorThumbnail: AuthorThumbnail;
  placeholderText: Text;
  errorMessage: Text;
  emojiButton: EmojiButton;
  emojiPicker: EmojiPicker;
  aadcGuidelinesStateEntityKey: string;
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
  style: string;
  size: string;
  text: Text;
  navigationEndpoint?: ButtonRendererNavigationEndpoint;
  trackingParams: string;
  serviceEndpoint?: ButtonRendererServiceEndpoint;
  accessibility?: MenuPopupAccessibility;
}

export interface Button {
  buttonRenderer: CollapseButtonButtonRenderer;
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
  buttonRenderer: CancelButtonButtonRenderer;
}

export interface CancelButtonButtonRenderer {
  text: Text;
  trackingParams: string;
}

export interface Text {
  runs: TextRun[];
}

export interface TextRun {
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
  searchPlaceholderText: Text;
  searchNoResultsText: Text;
  pickSkinToneText: Text;
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
  categoryType: string;
  imageLoadingLazy?: boolean;
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

export interface ButtonRendererServiceEndpoint {
  clickTrackingParams: string;
  commandMetadata: DefaultServiceEndpointCommandMetadata;
  createCommentReplyEndpoint: CreateCommentReplyEndpoint;
}

export interface CreateCommentReplyEndpoint {
  createReplyParams: string;
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
  menuServiceItemRenderer: MenuServiceItemRenderer;
}

export interface MenuServiceItemRenderer {
  text: Text;
  icon: Icon;
  serviceEndpoint: MenuServiceItemRendererServiceEndpoint;
  trackingParams: string;
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
  webPageType: string;
  rootVe: number;
  apiUrl?: string;
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
  videoId: string;
  startTimeSeconds: number;
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
  navigationEndpoint: FluffyNavigationEndpoint;
}

export interface FluffyNavigationEndpoint {
  clickTrackingParams: string;
  commandMetadata: AuthorEndpointCommandMetadata;
  watchEndpoint: FluffyWatchEndpoint;
}

export interface FluffyWatchEndpoint {
  videoId: string;
  params: string;
}
