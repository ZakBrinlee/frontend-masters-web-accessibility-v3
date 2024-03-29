import { useState } from 'react';
import { ChakraProvider, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Text } from '@chakra-ui/react';

import ProductHeader from './ProductHeader';
import ProductDetails from './ProductDetails';
import ProductImageGallery from './ProductImageGallery';
import { IconBack } from './Icons';

import type { Product } from '../types';

type ProductPageProps = {
	productData: Product;
	shouldAnimate?: boolean;
};

const ProductPage = ({ productData, shouldAnimate = false }: ProductPageProps) => {
	const [shoppingCartItems, updateShoppingCartItems] = useState<Product[]>([]);
	const [isFullscreenShowing, setFullscreenShowing] = useState<boolean>(false);

	const onFullscreen = () => {
		setFullscreenShowing(true);
	};
	const onFullscreenClose = () => {
		setFullscreenShowing(false);
	};

	const onAddToCart = (product: Product) => {
		const items = [...shoppingCartItems, product];
		updateShoppingCartItems(items);
	}
	return (
		<ChakraProvider>
			<div
				className={`bg-white border-2 border-solid border-slate-600 demo relative ${
					isFullscreenShowing ? 'overflow-hidden max-h-screen w-100' : ''
				}`}>
				<ProductHeader shoppingCartItems={shoppingCartItems} shouldAnimate={shouldAnimate} />
				<div className="text-black my-2 max-w-[1400px] mx-auto">
					<HStack>
						<Button variant="link" color="currentColor" size="sm" leftIcon={<IconBack />}>
							&lt; Back
						</Button>
						<Text>/</Text>
						<Breadcrumb separator="/" fontSize="sm" color="black">
							<BreadcrumbItem>
								<BreadcrumbLink href="#hike-camp" color="black">
									Hike &amp; Camp
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbItem>
								<BreadcrumbLink href={productData.breadcrumb.slug} color="black">
									{productData.breadcrumb.title}
								</BreadcrumbLink>
							</BreadcrumbItem>
						</Breadcrumb>
					</HStack>
					<div className="grid grid-cols-1 gap-2 md:grid-cols-6">
						<div className="col-span-4">
							<ProductImageGallery
								imageData={productData.images}
								onFullscreenOpen={() => onFullscreen()}
								onFullscreenClose={() => onFullscreenClose()}
							/>
						</div>
						<div className="col-span-2 px-4 md:px-0">
							<ProductDetails product={productData} onAddToCart={onAddToCart} />
						</div>
					</div>
				</div>
			</div>
		</ChakraProvider>
	);
};
export default ProductPage;
