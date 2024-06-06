async function fetchFruits() {
    try {
        const response = await fetch('https://api.predic8.de/shop/v2/products/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Clear the list before adding new items

        if (data.products && data.products.length > 0) {
            for (const product of data.products) {
                const li = document.createElement('li');
                li.textContent = `Product: ${product.name}`;
                productList.appendChild(li);

                // Construct the URL for product details using self_link
                const productDetails = await fetchProductDetails(`https://api.predic8.de${product.self_link}`);
                if (productDetails) {
                    const price = document.createElement('p');
                    price.textContent = `Price: ${productDetails.price}`;
                    li.appendChild(price);

                    const img = document.createElement('img');
                    img.src = `https://api.predic8.de${productDetails.photo}`;
                    img.alt = product.name;
                    li.appendChild(img);
                }
            }
        } else {
            console.log('No fruits found');
        }
    } catch (error) {
        console.error('Error fetching the fruits:', error);
    }
}

async function fetchProductDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            price: data.price,
            photo: data.image_link // Assuming image_link holds the URL of the photo
        };
    } catch (error) {
        console.error(`Error fetching product details from ${url}:`, error);
        return null;
    }
}

document.getElementById('getButton').addEventListener('click', fetchFruits);
