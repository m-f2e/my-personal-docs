# WKWebView简介

## 1、简介
`WKWebView`是苹果公司提供的一种新的`Web视图`，它是基于WebKit内核的，提供了更好的性能和更多的功能。
`WKWebView`可以加载H5页面、视频、音频等多媒体资源，也可以与原生应用进行交互。

## 加载离线包
```Objective-C
-(void)addWkWebview {
    WKWebView *webview = [[WKWebView alloc] initWithFrame:CGRectMake(0, 100, kScreenWidth, 400)];
    [self.view addSubview:webview];
    webview.navigationDelegate = self;
    // 加载离线包
    NSString *bundPath = @"/User/xxx/xxx/";
    NSString *h5Path = [NSString stringWithFormat:@"%@/%@", bundPath, @"bundle1.2/index.html#/car"];
    NSURL *fileUrl = [NSURL URLWithString:[NSString stringWithFormat:@"file://%@", h5Path]];
    NSURL *accessURL = [NSURL fileURLWithPath:[[h5Path componentsSeparatedByString:@"/index.html"] firstObject]];
    [webview loadFileURL:fileUrl allowingReadAccessToURL:accessURL];
    NSLog(@"@@@@@@@@@@@@@@@@@@@ wkwebivew load start ---------%f", CFAbsoluteTimeGetCurrent());
}

// 网络请求开始的代理方法
- (void)webView:(WKWebView *)webView didStartProvisionalNavigation:(WKNavigation *)navigation {
    //NSLog(@"@@@@@@@@@@@@@@@@@@@ wkwebivew load start ---------%f", CFAbsoluteTimeGetCurrent());
}

// 网络请求结束的代理方法，网络请求成功或者失败都会调用，需要在navigation里面获取response响应判断statusCode
- (void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation {
    NSLog(@"@@@@@@@@@@@@@@@@@@@ wkwebivew load end ---------%f", CFAbsoluteTimeGetCurrent());
}
```