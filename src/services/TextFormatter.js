export default function capitalCase (text) {
    let formatted = '';
    
    formatted = text.replace('-',' ')
    .split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')

    return formatted
}
