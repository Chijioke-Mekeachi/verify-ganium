export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (copyErr) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

export const getShareLink = (uid: string): string => {
  return `https://verify-ganium.vercel.app/result?uid=${uid}`;
};