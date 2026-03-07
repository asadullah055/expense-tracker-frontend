import { LuCopy, LuLink2, LuRefreshCw, LuUnlink2 } from "react-icons/lu";

const TelegramSettings = ({
  status,
  linkData,
  loading,
  onGenerateCode,
  onRefreshStatus,
  onUnlink,
  onCopyCode,
  onCopyDeepLink,
}) => {
  const isLinked = Boolean(status?.isTelegramLinked);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h5 className="text-lg font-semibold">Telegram Integration</h5>
          <p className="text-sm text-gray-500">
            Link your Telegram account to manage income and expense from chat.
          </p>
        </div>

        <button
          type="button"
          className="add-btn"
          onClick={onRefreshStatus}
          disabled={loading}
        >
          <LuRefreshCw className="text-lg" />
          Refresh Status
        </button>
      </div>

      <div className="mt-4 border border-gray-100 rounded-xl p-4 bg-white">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          {isLinked ? "Linked" : "Not linked"}
        </p>
        {isLinked && status?.telegramChatId && (
          <p className="text-xs text-gray-500 mt-1">
            Chat ID: {status.telegramChatId}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <button
          type="button"
          className="add-btn"
          onClick={onGenerateCode}
          disabled={loading}
        >
          <LuLink2 className="text-lg" />
          Generate Link Code
        </button>

        <button
          type="button"
          className="add-btn !bg-red-50 !text-red-600"
          onClick={onUnlink}
          disabled={loading || !isLinked}
        >
          <LuUnlink2 className="text-lg" />
          Unlink Telegram
        </button>
      </div>

      {linkData?.code && (
        <div className="mt-5 border border-gray-100 rounded-xl p-4 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800">
            Your link code: {linkData.code}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Expires at: {new Date(linkData.expiresAt).toLocaleString()}
          </p>
          <div className="mt-3 flex gap-3 flex-wrap">
            <button
              type="button"
              className="add-btn"
              onClick={onCopyCode}
              disabled={loading}
            >
              <LuCopy className="text-lg" />
              Copy Code
            </button>
            {linkData.deepLink && (
              <button
                type="button"
                className="add-btn"
                onClick={onCopyDeepLink}
                disabled={loading}
              >
                <LuCopy className="text-lg" />
                Copy Deep Link
              </button>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Send <span className="font-semibold">/link {linkData.code}</span> to
            your Telegram bot.
          </p>
        </div>
      )}
    </div>
  );
};

export default TelegramSettings;
