const truncate = (string, limit) => {
    if(string.length > limit) {
        return string.substring(0, limit - 3) + "...";
    }
    return string
}

export { truncate };