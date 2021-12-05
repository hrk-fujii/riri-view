const viewUtil = {
    loading: () => {
        return (<>
            <p>読み込み中...</p>
        </>);
    },

    error: () => {
        return (<>
            <p>エラーが発生しました。</p>
        </>);
    }
}

export default viewUtil;
