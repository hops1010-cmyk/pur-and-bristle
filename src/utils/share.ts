/**
 * Pragmatic Social Media & Native Share Utility
 */

export interface SharePayload {
  title: string;
  text: string;
  url?: string;
}

export interface ShareResult {
  success: boolean;
  method: 'native' | 'clipboard' | 'canceled' | 'error';
  message: string;
}

export async function shareContent(payload: SharePayload): Promise<ShareResult> {
  const urlToShare = payload.url || window.location.href;
  const shareData = {
    title: payload.title,
    text: payload.text,
    url: urlToShare,
  };

  // Try Native Web Share API first
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      if (!navigator.canShare || navigator.canShare(shareData)) {
        await navigator.share(shareData);
        return {
          success: true,
          method: 'native',
          message: 'Shared successfully via native share sheet!',
        };
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return {
          success: false,
          method: 'canceled',
          message: 'Share canceled.',
        };
      }
      // If native share fails, gracefully fall through to clipboard
    }
  }

  // Fallback to Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      const formattedClipboardText = `${payload.title}\n\n${payload.text}\n\n${urlToShare}`;
      await navigator.clipboard.writeText(formattedClipboardText);
      return {
        success: true,
        method: 'clipboard',
        message: 'Details and link copied to clipboard!',
      };
    } catch {
      // Continue to prompt fallback
    }
  }

  // Last resort manual copy prompt
  return {
    success: false,
    method: 'error',
    message: 'Unable to share or access clipboard.',
  };
}
