# Next.js Image Sizing: Avoiding Blurry Images

## The Problem

When using Next.js `Image` component, images can appear blurry on initial load, especially on high-DPI displays (retina screens). This is often caused by incorrect `width` and `height` prop values.

## Why Images Get Blurry

### The Root Cause

1. **Next.js generates optimized image variants** based on the `width` and `height` props you specify
2. **High-DPI displays (retina screens)** have a device pixel ratio of 2x or 3x, meaning they need 2-3x the resolution to render sharp images
3. If you specify small dimensions, Next.js may generate variants that are too small for high-DPI displays, causing **upscaling** which results in blurriness

### Example of the Problem

```tsx
// ❌ Too small - will blur on retina displays
<Image
  src="/logo.png"
  width={80}
  height={80}
  className="h-12 w-auto"  // Rendered at ~48px height
/>
```

**What happens:**
- Image renders at `48px` height
- On a 2x retina display, the browser needs `96px` to render sharply
- Next.js generates variants around `80px` (based on your props)
- Browser requests larger size → Next.js upscales → **blurry image**

## The Solution

### Correct Approach

Always set `width` and `height` props to be **at least as large as the maximum rendered size**, accounting for device pixel ratio:

```tsx
// ✅ Correct - provides enough resolution
<Image
  src="/logo.png"
  width={200}
  height={200}
  className="h-12 w-auto"  // Rendered at ~48px height
/>
```

**Why this works:**
- Image renders at `48px` height
- On a 2x retina display, needs `96px`
- Next.js has `200px` variants available
- Browser uses appropriate variant → **sharp image**

## Next.js Image Sizing Calculation

Next.js uses `width` and `height` props to:

1. **Generate optimized variants** at multiple sizes
2. **Maintain aspect ratio** (prevents distortion)
3. **Provide intrinsic dimensions** (prevents layout shift during loading)
4. **Serve responsive images** (browser picks best variant for device)

### Sizing Formula

Set dimensions to at least:

```
Rendered Size × Device Pixel Ratio × Safety Factor
```

Where:
- **Rendered Size**: The actual CSS size (e.g., `h-12` = 48px)
- **Device Pixel Ratio**: Typically 1x, 2x, or 3x (2x most common)
- **Safety Factor**: Use 1.5-2x margin for best quality

### Example Calculations

| Rendered Size | Device Pixel Ratio | Calculation | Recommended `width`/`height` |
|--------------|-------------------|-------------|---------------------------|
| 48px (`h-12`) | 2x | 48 × 2 × 1.5 = 144px | `200` (rounded up) |
| 200px | 2x | 200 × 2 × 1.5 = 600px | `800` (rounded up) |
| 500px | 2x | 500 × 2 × 1.5 = 1500px | `1600` (rounded up) |

## Best Practices

### 1. Always Oversize Your Dimensions

When in doubt, use larger dimensions. Next.js optimizes images, so larger source dimensions don't significantly impact bundle size:

```tsx
// For images rendered at ~48px
<Image width={200} height={200} ... />

// For images rendered at ~200px  
<Image width={400} height={400} ... />

// For hero images at ~500px
<Image width={1000} height={1000} ... />
```

### 2. Match Aspect Ratio

Always maintain the aspect ratio between `width`/`height` props and the rendered size:

```tsx
// ✅ Correct aspect ratio
<Image
  width={200}
  height={200}
  className="w-48 h-48"  // 1:1 ratio maintained
/>

// ✅ Correct - different aspect ratios
<Image
  width={400}
  height={300}
  className="w-64 h-48"  // 4:3 ratio maintained
/>
```

### 3. Common Use Cases

#### Small Icons/Logos (24-64px)
```tsx
<Image
  width={150}
  height={150}
  className="h-8 w-auto"
/>
```

#### Medium Images (100-300px)
```tsx
<Image
  width={400}
  height={400}
  className="w-48 h-48"
/>
```

#### Large/Hero Images (400px+)
```tsx
<Image
  width={1200}
  height={800}
  className="w-full h-auto"
/>
```

## Additional Tips

### Quality Settings

- **Default quality**: 75% (good balance)
- **High quality**: `quality={90}` (for hero images)
- **Maximum quality**: `quality={100}` (use sparingly, larger file sizes)

### Loading Strategies

- **Lazy loading** (default): Images load when entering viewport
  ```tsx
  <Image loading="lazy" ... />
  ```

- **Priority loading**: For above-the-fold critical images
  ```tsx
  <Image priority ... />
  ```

### Performance Considerations

- Larger `width`/`height` props don't affect bundle size (Next.js optimizes)
- Use `priority` only for critical above-the-fold images (max 2-3 images)
- Let Next.js handle responsive image serving automatically

## Summary

**The Golden Rule**: Always set `width` and `height` props to be **2-3x larger** than the rendered size to ensure sharp images on all devices, especially high-DPI displays.

**Remember**: 
- ✅ Larger dimensions = Sharp images on retina displays
- ❌ Smaller dimensions = Blurry images on retina displays
- Next.js optimizes automatically, so larger props don't hurt performance

