# simpleping

## 简介
PING （Packet Internet Groper），因特网 包探索器，用于测试网络连接量的程序。Ping是工作在 TCP/IP 网络体系结构中应用层的一个服务命令， 主要是向特定的目的主机发送 ICMP （Internet Control Message Protocol 因特网报文控制协议） Echo 请求报文，测试目的站是否可达及了解其有关状态。
Apple 的 SimplePing 封装了 ping 的功能，提供了简单的 API，以编程的方式对没有管理员权限的远程主机执行 ping 操作，支持 IPv4 和 IPv6。

## 使用方式
要在自己的项目中使用[SimplePing](https://developer.apple.com/library/archive/samplecode/SimplePing/Introduction/Intro.html#//apple_ref/doc/uid/DTS10000716)，需要先下载 SimplePing 文件，并添加到项目中。

参考项目： https://github.com/lovesunstar/STPingTest/

## SimplePing.h
```js
/*
    Copyright (C) 2016 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    An object wrapper around the low-level BSD Sockets ping function.
 */

@import Foundation;

#include <AssertMacros.h>           // for __Check_Compile_Time

NS_ASSUME_NONNULL_BEGIN

@protocol SimplePingDelegate;

/*! Controls the IP address version used by SimplePing instances.
 */

typedef NS_ENUM(NSInteger, SimplePingAddressStyle) {
    SimplePingAddressStyleAny,          ///< Use the first IPv4 or IPv6 address found; the default.
    SimplePingAddressStyleICMPv4,       ///< Use the first IPv4 address found.
    SimplePingAddressStyleICMPv6        ///< Use the first IPv6 address found.
};

/*! An object wrapper around the low-level BSD Sockets ping function.
 *  \details To use the class create an instance, set the delegate and call `-start` 
 *      to start the instance on the current run loop.  If things go well you'll soon get the 
 *      `-simplePing:didStartWithAddress:` delegate callback.  From there you can can call 
 *      `-sendPingWithData:` to send a ping and you'll receive the 
 *      `-simplePing:didReceivePingResponsePacket:sequenceNumber:` and 
 *      `-simplePing:didReceiveUnexpectedPacket:` delegate callbacks as ICMP packets arrive.
 *
 *      The class can be used from any thread but the use of any single instance must be 
 *      confined to a specific thread and that thread must run its run loop.
 */

@interface SimplePing : NSObject

- (instancetype)init NS_UNAVAILABLE;

/*! Initialise the object to ping the specified host.
 *  \param hostName The DNS name of the host to ping; an IPv4 or IPv6 address in string form will 
 *      work here.
 *  \returns The initialised object.
 */

- (instancetype)initWithHostName:(NSString *)hostName NS_DESIGNATED_INITIALIZER;

/*! A copy of the value passed to `-initWithHostName:`.
 */

@property (nonatomic, copy, readonly) NSString * hostName;

/*! The delegate for this object.
 *  \details Delegate callbacks are schedule in the default run loop mode of the run loop of the 
 *      thread that calls `-start`.
 */

@property (nonatomic, weak, readwrite, nullable) id<SimplePingDelegate> delegate;

/*! Controls the IP address version used by the object.
 *  \details You should set this value before starting the object.
 */

@property (nonatomic, assign, readwrite) SimplePingAddressStyle addressStyle;

/*! The address being pinged.
 *  \details The contents of the NSData is a (struct sockaddr) of some form.  The 
 *      value is nil while the object is stopped and remains nil on start until 
 *      `-simplePing:didStartWithAddress:` is called.
 */
 
@property (nonatomic, copy, readonly, nullable) NSData * hostAddress;
@property (nonatomic, copy, readonly, nullable) NSString *IPAddress;


/*! The address family for `hostAddress`, or `AF_UNSPEC` if that's nil.
 */

@property (nonatomic, assign, readonly) sa_family_t hostAddressFamily;

/*! The identifier used by pings by this object.
 *  \details When you create an instance of this object it generates a random identifier 
 *      that it uses to identify its own pings.
 */

@property (nonatomic, assign, readonly) uint16_t identifier;

/*! The next sequence number to be used by this object.
 *  \details This value starts at zero and increments each time you send a ping (safely 
 *      wrapping back to zero if necessary).  The sequence number is included in the ping, 
 *      allowing you to match up requests and responses, and thus calculate ping times and 
 *      so on.
 */

@property (nonatomic, assign, readonly) uint16_t nextSequenceNumber;

/*! Starts the object.
 *  \details You should set up the delegate and any ping parameters before calling this.
 *      
 *      If things go well you'll soon get the `-simplePing:didStartWithAddress:` delegate 
 *      callback, at which point you can start sending pings (via `-sendPingWithData:`) and 
 *      will start receiving ICMP packets (either ping responses, via the 
 *      `-simplePing:didReceivePingResponsePacket:sequenceNumber:` delegate callback, or 
 *      unsolicited ICMP packets, via the `-simplePing:didReceiveUnexpectedPacket:` delegate 
 *      callback).
 *
 *      If the object fails to start, typically because `hostName` doesn't resolve, you'll get 
 *      the `-simplePing:didFailWithError:` delegate callback.
 *
 *      It is not correct to start an already started object.
 */

- (void)start;

/*! Sends a ping packet containing the specified data.
 *  \details Sends an actual ping.
 *
 *      The object must be started when you call this method and, on starting the object, you must 
 *      wait for the `-simplePing:didStartWithAddress:` delegate callback before calling it.
 *  \param data Some data to include in the ping packet, after the ICMP header, or nil if you 
 *      want the packet to include a standard 56 byte payload (resulting in a standard 64 byte 
 *      ping).
 */

- (void)sendPingWithData:(nullable NSData *)data;

/*! Stops the object.
 *  \details You should call this when you're done pinging.
 *      
 *      It's safe to call this on an object that's stopped.
 */

- (void)stop;

@end

/*! A delegate protocol for the SimplePing class.
 */

@protocol SimplePingDelegate <NSObject>

@optional

/*! A SimplePing delegate callback, called once the object has started up.
 *  \details This is called shortly after you start the object to tell you that the 
 *      object has successfully started.  On receiving this callback, you can call 
 *      `-sendPingWithData:` to send pings.
 *
 *      If the object didn't start, `-simplePing:didFailWithError:` is called instead.
 *  \param pinger The object issuing the callback.
 *  \param address The address that's being pinged; at the time this delegate callback 
 *      is made, this will have the same value as the `hostAddress` property.
 */

- (void)simplePing:(SimplePing *)pinger didStartWithAddress:(NSData *)address;

/*! A SimplePing delegate callback, called if the object fails to start up.
 *  \details This is called shortly after you start the object to tell you that the 
 *      object has failed to start.  The most likely cause of failure is a problem 
 *      resolving `hostName`.
 *
 *      By the time this callback is called, the object has stopped (that is, you don't 
 *      need to call `-stop` yourself).
 *  \param pinger The object issuing the callback.
 *  \param error Describes the failure.
 */
    
- (void)simplePing:(SimplePing *)pinger didFailWithError:(NSError *)error;

/*! A SimplePing delegate callback, called when the object has successfully sent a ping packet. 
 *  \details Each call to `-sendPingWithData:` will result in either a 
 *      `-simplePing:didSendPacket:sequenceNumber:` delegate callback or a 
 *      `-simplePing:didFailToSendPacket:sequenceNumber:error:` delegate callback (unless you 
 *      stop the object before you get the callback).  These callbacks are currently delivered 
 *      synchronously from within `-sendPingWithData:`, but this synchronous behaviour is not 
 *      considered API.
 *  \param pinger The object issuing the callback.
 *  \param packet The packet that was sent; this includes the ICMP header (`ICMPHeader`) and the 
 *      data you passed to `-sendPingWithData:` but does not include any IP-level headers.
 *  \param sequenceNumber The ICMP sequence number of that packet.
 */

- (void)simplePing:(SimplePing *)pinger didSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber;

/*! A SimplePing delegate callback, called when the object fails to send a ping packet. 
 *  \details Each call to `-sendPingWithData:` will result in either a 
 *      `-simplePing:didSendPacket:sequenceNumber:` delegate callback or a 
 *      `-simplePing:didFailToSendPacket:sequenceNumber:error:` delegate callback (unless you 
 *      stop the object before you get the callback).  These callbacks are currently delivered 
 *      synchronously from within `-sendPingWithData:`, but this synchronous behaviour is not 
 *      considered API.
 *  \param pinger The object issuing the callback.
 *  \param packet The packet that was not sent; see `-simplePing:didSendPacket:sequenceNumber:` 
 *      for details.
 *  \param sequenceNumber The ICMP sequence number of that packet.
 *  \param error Describes the failure.
 */

- (void)simplePing:(SimplePing *)pinger didFailToSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber error:(NSError *)error;

/*! A SimplePing delegate callback, called when the object receives a ping response.
 *  \details If the object receives an ping response that matches a ping request that it 
 *      sent, it informs the delegate via this callback.  Matching is primarily done based on 
 *      the ICMP identifier, although other criteria are used as well.
 *  \param pinger The object issuing the callback.
 *  \param packet The packet received; this includes the ICMP header (`ICMPHeader`) and any data that 
 *      follows that in the ICMP message but does not include any IP-level headers.
 *  \param sequenceNumber The ICMP sequence number of that packet.
 */

- (void)simplePing:(SimplePing *)pinger didReceivePingResponsePacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber;

/*! A SimplePing delegate callback, called when the object receives an unmatched ICMP message.
 *  \details If the object receives an ICMP message that does not match a ping request that it 
 *      sent, it informs the delegate via this callback.  The nature of ICMP handling in a 
 *      BSD kernel makes this a common event because, when an ICMP message arrives, it is 
 *      delivered to all ICMP sockets.
 *
 *      IMPORTANT: This callback is especially common when using IPv6 because IPv6 uses ICMP 
 *      for important network management functions.  For example, IPv6 routers periodically 
 *      send out Router Advertisement (RA) packets via Neighbor Discovery Protocol (NDP), which 
 *      is implemented on top of ICMP.
 *
 *      For more on matching, see the discussion associated with 
 *      `-simplePing:didReceivePingResponsePacket:sequenceNumber:`.
 *  \param pinger The object issuing the callback.
 *  \param packet The packet received; this includes the ICMP header (`ICMPHeader`) and any data that 
 *      follows that in the ICMP message but does not include any IP-level headers.
 */

- (void)simplePing:(SimplePing *)pinger didReceiveUnexpectedPacket:(NSData *)packet;

@end

#pragma mark * ICMP On-The-Wire Format

/*! Describes the on-the-wire header format for an ICMP ping.
 *  \details This defines the header structure of ping packets on the wire.  Both IPv4 and 
 *      IPv6 use the same basic structure.  
 *  
 *      This is declared in the header because clients of SimplePing might want to use 
 *      it parse received ping packets.
 */

struct ICMPHeader {
    uint8_t     type;
    uint8_t     code;
    uint16_t    checksum;
    uint16_t    identifier;
    uint16_t    sequenceNumber;
    // data...
};
typedef struct ICMPHeader ICMPHeader;

__Check_Compile_Time(sizeof(ICMPHeader) == 8);
__Check_Compile_Time(offsetof(ICMPHeader, type) == 0);
__Check_Compile_Time(offsetof(ICMPHeader, code) == 1);
__Check_Compile_Time(offsetof(ICMPHeader, checksum) == 2);
__Check_Compile_Time(offsetof(ICMPHeader, identifier) == 4);
__Check_Compile_Time(offsetof(ICMPHeader, sequenceNumber) == 6);

enum {
    ICMPv4TypeEchoRequest = 8,          ///< The ICMP `type` for a ping request; in this case `code` is always 0.
    ICMPv4TypeEchoReply   = 0           ///< The ICMP `type` for a ping response; in this case `code` is always 0.
};

enum {
    ICMPv6TypeEchoRequest = 128,        ///< The ICMP `type` for a ping request; in this case `code` is always 0.
    ICMPv6TypeEchoReply   = 129         ///< The ICMP `type` for a ping response; in this case `code` is always 0.
};

NS_ASSUME_NONNULL_END

```

## SimplePing.m
```js
/*
    Copyright (C) 2016 Apple Inc. All Rights Reserved.
    See LICENSE.txt for this sample’s licensing information
    
    Abstract:
    An object wrapper around the low-level BSD Sockets ping function.
 */

#import "SimplePing.h"

#include <sys/socket.h>
#include <netinet/in.h>
#include <errno.h>
#include <arpa/inet.h>
#include <arpa/inet.h>

#pragma mark * IPv4 and ICMPv4 On-The-Wire Format

/*! Describes the on-the-wire header format for an IPv4 packet.
 *  \details This defines the header structure of IPv4 packets on the wire.  We need 
 *      this in order to skip this header in the IPv4 case, where the kernel passes 
 *      it to us for no obvious reason.
 */
 
struct IPv4Header {
    uint8_t     versionAndHeaderLength;
    uint8_t     differentiatedServices;
    uint16_t    totalLength;
    uint16_t    identification;
    uint16_t    flagsAndFragmentOffset;
    uint8_t     timeToLive;
    uint8_t     protocol;
    uint16_t    headerChecksum;
    uint8_t     sourceAddress[4];
    uint8_t     destinationAddress[4];
    // options...
    // data...
};
typedef struct IPv4Header IPv4Header;

__Check_Compile_Time(sizeof(IPv4Header) == 20);
__Check_Compile_Time(offsetof(IPv4Header, versionAndHeaderLength) == 0);
__Check_Compile_Time(offsetof(IPv4Header, differentiatedServices) == 1);
__Check_Compile_Time(offsetof(IPv4Header, totalLength) == 2);
__Check_Compile_Time(offsetof(IPv4Header, identification) == 4);
__Check_Compile_Time(offsetof(IPv4Header, flagsAndFragmentOffset) == 6);
__Check_Compile_Time(offsetof(IPv4Header, timeToLive) == 8);
__Check_Compile_Time(offsetof(IPv4Header, protocol) == 9);
__Check_Compile_Time(offsetof(IPv4Header, headerChecksum) == 10);
__Check_Compile_Time(offsetof(IPv4Header, sourceAddress) == 12);
__Check_Compile_Time(offsetof(IPv4Header, destinationAddress) == 16);

/*! Calculates an IP checksum.
 *  \details This is the standard BSD checksum code, modified to use modern types.
 *  \param buffer A pointer to the data to checksum.
 *  \param bufferLen The length of that data.
 *  \returns The checksum value, in network byte order.
 */

static uint16_t in_cksum(const void *buffer, size_t bufferLen) {
    // 
	size_t              bytesLeft;
    int32_t             sum;
	const uint16_t *    cursor;
	union {
		uint16_t        us;
		uint8_t         uc[2];
	} last;
	uint16_t            answer;

	bytesLeft = bufferLen;
	sum = 0;
	cursor = buffer;

	/*
	 * Our algorithm is simple, using a 32 bit accumulator (sum), we add
	 * sequential 16 bit words to it, and at the end, fold back all the
	 * carry bits from the top 16 bits into the lower 16 bits.
	 */
	while (bytesLeft > 1) {
		sum += *cursor;
        cursor += 1;
		bytesLeft -= 2;
	}

	/* mop up an odd byte, if necessary */
	if (bytesLeft == 1) {
		last.uc[0] = * (const uint8_t *) cursor;
		last.uc[1] = 0;
		sum += last.us;
	}

	/* add back carry outs from top 16 bits to low 16 bits */
	sum = (sum >> 16) + (sum & 0xffff);	/* add hi 16 to low 16 */
	sum += (sum >> 16);			/* add carry */
	answer = (uint16_t) ~sum;   /* truncate to 16 bits */

	return answer;
}

#pragma mark * SimplePing

@interface SimplePing ()

// read/write versions of public properties

@property (nonatomic, copy,   readwrite, nullable) NSData *     hostAddress;
@property (nonatomic, copy, readwrite, nullable) NSString *IPAddress;
@property (nonatomic, assign, readwrite          ) uint16_t     nextSequenceNumber;

// private properties

/*! True if nextSequenceNumber has wrapped from 65535 to 0.
 */
 
@property (nonatomic, assign, readwrite)           BOOL         nextSequenceNumberHasWrapped;

/*! A host object for name-to-address resolution.
 */

@property (nonatomic, strong, readwrite, nullable) CFHostRef host __attribute__ ((NSObject));

/*! A socket object for ICMP send and receive.
 */

@property (nonatomic, strong, readwrite, nullable) CFSocketRef socket __attribute__ ((NSObject));

@end

@implementation SimplePing

- (instancetype)initWithHostName:(NSString *)hostName {
    NSParameterAssert(hostName != nil);
    self = [super init];
    if (self != nil) {
        self->_hostName   = [hostName copy];
        self->_identifier = (uint16_t) arc4random();
    }
    return self;
}

- (void)dealloc {
    [self stop];
    // Double check that -stop took care of _host and _socket.
    assert(self->_host == NULL);
    assert(self->_socket == NULL);
}

- (sa_family_t)hostAddressFamily {
    sa_family_t     result;
    
    result = AF_UNSPEC;
    if ( (self.hostAddress != nil) && (self.hostAddress.length >= sizeof(struct sockaddr)) ) {
        result = ((const struct sockaddr *) self.hostAddress.bytes)->sa_family;
    }
    return result;
}

/*! Shuts down the pinger object and tell the delegate about the error.
 *  \param error Describes the failure.
 */

- (void)didFailWithError:(NSError *)error {
    id<SimplePingDelegate>  strongDelegate;
    
    assert(error != nil);
    
    // We retain ourselves temporarily because it's common for the delegate method 
    // to release its last reference to us, which causes -dealloc to be called here. 
    // If we then reference self on the return path, things go badly.  I don't think 
    // that happens currently, but I've got into the habit of doing this as a 
    // defensive measure.
    
    CFAutorelease( CFBridgingRetain( self ));
    
    [self stop];
    strongDelegate = self.delegate;
    if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didFailWithError:)] ) {
        [strongDelegate simplePing:self didFailWithError:error];
    }
}

/*! Shuts down the pinger object and tell the delegate about the error.
 *  \details This converts the CFStreamError to an NSError and then call through to 
 *      -didFailWithError: to do the real work.
 *  \param streamError Describes the failure.
 */

- (void)didFailWithHostStreamError:(CFStreamError)streamError {
    NSDictionary *  userInfo;
    NSError *       error;

    if (streamError.domain == kCFStreamErrorDomainNetDB) {
        userInfo = @{(id) kCFGetAddrInfoFailureKey: @(streamError.error)};
    } else {
        userInfo = nil;
    }
    error = [NSError errorWithDomain:(NSString *) kCFErrorDomainCFNetwork code:kCFHostErrorUnknown userInfo:userInfo];

    [self didFailWithError:error];
}

/*! Builds a ping packet from the supplied parameters.
 *  \param type The packet type, which is different for IPv4 and IPv6.
 *  \param payload Data to place after the ICMP header.
 *  \param requiresChecksum Determines whether a checksum is calculated (IPv4) or not (IPv6).
 *  \returns A ping packet suitable to be passed to the kernel.
 */

- (NSData *)pingPacketWithType:(uint8_t)type payload:(NSData *)payload requiresChecksum:(BOOL)requiresChecksum {
    NSMutableData *         packet;
    ICMPHeader *            icmpPtr;

    packet = [NSMutableData dataWithLength:sizeof(*icmpPtr) + payload.length];
    assert(packet != nil);

    icmpPtr = packet.mutableBytes;
    icmpPtr->type = type;
    icmpPtr->code = 0;
    icmpPtr->checksum = 0;
    icmpPtr->identifier     = OSSwapHostToBigInt16(self.identifier);
    icmpPtr->sequenceNumber = OSSwapHostToBigInt16(self.nextSequenceNumber);
    memcpy(&icmpPtr[1], [payload bytes], [payload length]);
    
    if (requiresChecksum) {
        // The IP checksum routine returns a 16-bit number that's already in correct byte order 
        // (due to wacky 1's complement maths), so we just put it into the packet as a 16-bit unit.
        
        icmpPtr->checksum = in_cksum(packet.bytes, packet.length);
    }
    
    return packet;
}

- (void)sendPingWithData:(NSData *)data {
    int                     err;
    NSData *                payload;
    NSData *                packet;
    ssize_t                 bytesSent;
    id<SimplePingDelegate>  strongDelegate;
    
    // data may be nil
    NSParameterAssert(self.hostAddress != nil);     // gotta wait for -simplePing:didStartWithAddress:
    
    // Construct the ping packet.
    
    payload = data;
    if (payload == nil) {
        payload = [[NSString stringWithFormat:@"%28zd bottles of beer on the wall", (ssize_t) 99 - (size_t) (self.nextSequenceNumber % 100) ] dataUsingEncoding:NSASCIIStringEncoding];
        assert(payload != nil);
        
        // Our dummy payload is sized so that the resulting ICMP packet, including the ICMPHeader, is 
        // 64-bytes, which makes it easier to recognise our packets on the wire.
        
        assert([payload length] == 56);
    }
    
    switch (self.hostAddressFamily) {
        case AF_INET: {
            packet = [self pingPacketWithType:ICMPv4TypeEchoRequest payload:payload requiresChecksum:YES];
        } break;
        case AF_INET6: {
            packet = [self pingPacketWithType:ICMPv6TypeEchoRequest payload:payload requiresChecksum:NO];
        } break;
        default: {
            assert(NO);
        } break;
    }
    assert(packet != nil);

    // Send the packet.
    
    if (self.socket == NULL) {
        bytesSent = -1;
        err = EBADF;
    } else {
        bytesSent = sendto(
            CFSocketGetNative(self.socket),
            packet.bytes,
            packet.length, 
            0,
            self.hostAddress.bytes, 
            (socklen_t) self.hostAddress.length
        );
        err = 0;
        if (bytesSent < 0) {
            err = errno;
        }
    }

    // Handle the results of the send.
    
    strongDelegate = self.delegate;
    if ( (bytesSent > 0) && (((NSUInteger) bytesSent) == packet.length) ) {

        // Complete success.  Tell the client.

        if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didSendPacket:sequenceNumber:)] ) {
            [strongDelegate simplePing:self didSendPacket:packet sequenceNumber:self.nextSequenceNumber];
        }
    } else {
        NSError *   error;
        
        // Some sort of failure.  Tell the client.
        
        if (err == 0) {
            err = ENOBUFS;          // This is not a hugely descriptor error, alas.
        }
        error = [NSError errorWithDomain:NSPOSIXErrorDomain code:err userInfo:nil];
        if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didFailToSendPacket:sequenceNumber:error:)] ) {
            [strongDelegate simplePing:self didFailToSendPacket:packet sequenceNumber:self.nextSequenceNumber error:error];
        }
    }
    
    self.nextSequenceNumber += 1;
    if (self.nextSequenceNumber == 0) {
        self.nextSequenceNumberHasWrapped = YES;
    }
}

/*! Calculates the offset of the ICMP header within an IPv4 packet.
 *  \details In the IPv4 case the kernel returns us a buffer that includes the 
 *      IPv4 header.  We're not interested in that, so we have to skip over it. 
 *      This code does a rough check of the IPv4 header and, if it looks OK, 
 *      returns the offset of the ICMP header.
 *  \param packet The IPv4 packet, as returned to us by the kernel.
 *  \returns The offset of the ICMP header, or NSNotFound.
 */

+ (NSUInteger)icmpHeaderOffsetInIPv4Packet:(NSData *)packet {
    // Returns the offset of the ICMPv4Header within an IP packet.
    NSUInteger                  result;
    const struct IPv4Header *   ipPtr;
    size_t                      ipHeaderLength;
    
    result = NSNotFound;
    if (packet.length >= (sizeof(IPv4Header) + sizeof(ICMPHeader))) {
        ipPtr = (const IPv4Header *) packet.bytes;
        if ( ((ipPtr->versionAndHeaderLength & 0xF0) == 0x40) &&            // IPv4
             ( ipPtr->protocol == IPPROTO_ICMP ) ) {
            ipHeaderLength = (ipPtr->versionAndHeaderLength & 0x0F) * sizeof(uint32_t);
            if (packet.length >= (ipHeaderLength + sizeof(ICMPHeader))) {
                result = ipHeaderLength;
            }
        }
    }
    return result;
}

/*! Checks whether the specified sequence number is one we sent.
 *  \param sequenceNumber The incoming sequence number.
 *  \returns YES if the sequence number looks like one we sent.
 */
 
- (BOOL)validateSequenceNumber:(uint16_t)sequenceNumber {
    if (self.nextSequenceNumberHasWrapped) {
        // If the sequence numbers have wrapped that we can't reliably check 
        // whether this is a sequence number we sent.  Rather, we check to see 
        // whether the sequence number is within the last 120 sequence numbers 
        // we sent.  Note that the uint16_t subtraction here does the right 
        // thing regardless of the wrapping.
        // 
        // Why 120?  Well, if we send one ping per second, 120 is 2 minutes, which 
        // is the standard "max time a packet can bounce around the Internet" value.
        return ((uint16_t) (self.nextSequenceNumber - sequenceNumber)) < (uint16_t) 120;
    } else {
        return sequenceNumber < self.nextSequenceNumber;
    }
}

/*! Checks whether an incoming IPv4 packet looks like a ping response.
 *  \details This routine modifies this `packet` data!  It does this for two reasons:
 *
 *      * It needs to zero out the `checksum` field of the ICMPHeader in order to do 
 *          its checksum calculation.
 *
 *      * It removes the IPv4 header from the front of the packet.
 *  \param packet The IPv4 packet, as returned to us by the kernel.
 *  \param sequenceNumberPtr A pointer to a place to start the ICMP sequence number.
 *  \returns YES if the packet looks like a reasonable IPv4 ping response.
 */

- (BOOL)validatePing4ResponsePacket:(NSMutableData *)packet sequenceNumber:(uint16_t *)sequenceNumberPtr {
    BOOL                result;
    NSUInteger          icmpHeaderOffset;
    ICMPHeader *        icmpPtr;
    uint16_t            receivedChecksum;
    uint16_t            calculatedChecksum;
    
    result = NO;
    
    icmpHeaderOffset = [[self class] icmpHeaderOffsetInIPv4Packet:packet];
    if (icmpHeaderOffset != NSNotFound) {
        icmpPtr = (struct ICMPHeader *) (((uint8_t *) packet.mutableBytes) + icmpHeaderOffset);

        receivedChecksum   = icmpPtr->checksum;
        icmpPtr->checksum  = 0;
        calculatedChecksum = in_cksum(icmpPtr, packet.length - icmpHeaderOffset);
        icmpPtr->checksum  = receivedChecksum;
        
        if (receivedChecksum == calculatedChecksum) {
            if ( (icmpPtr->type == ICMPv4TypeEchoReply) && (icmpPtr->code == 0) ) {
                if ( OSSwapBigToHostInt16(icmpPtr->identifier) == self.identifier ) {
                    uint16_t    sequenceNumber;
                    
                    sequenceNumber = OSSwapBigToHostInt16(icmpPtr->sequenceNumber);
                    if ([self validateSequenceNumber:sequenceNumber]) {

                        // Remove the IPv4 header off the front of the data we received, leaving us with 
                        // just the ICMP header and the ping payload.
                        [packet replaceBytesInRange:NSMakeRange(0, icmpHeaderOffset) withBytes:NULL length:0];

                        *sequenceNumberPtr = sequenceNumber;
                        result = YES;
                    }
                }
            }
        }
    }

    return result;
}

/*! Checks whether an incoming IPv6 packet looks like a ping response.
 *  \param packet The IPv6 packet, as returned to us by the kernel; note that this routine
 *      could modify this data but does not need to in the IPv6 case.
 *  \param sequenceNumberPtr A pointer to a place to start the ICMP sequence number.
 *  \returns YES if the packet looks like a reasonable IPv4 ping response.
 */

- (BOOL)validatePing6ResponsePacket:(NSMutableData *)packet sequenceNumber:(uint16_t *)sequenceNumberPtr {
    BOOL                    result;
    const ICMPHeader *      icmpPtr;
    
    result = NO;
    
    if (packet.length >= sizeof(*icmpPtr)) {
        icmpPtr = packet.bytes;
        
        // In the IPv6 case we don't check the checksum because that's hard (we need to 
        // cook up an IPv6 pseudo header and we don't have the ingredients) and unnecessary 
        // (the kernel has already done this check).
        
        if ( (icmpPtr->type == ICMPv6TypeEchoReply) && (icmpPtr->code == 0) ) {
            if ( OSSwapBigToHostInt16(icmpPtr->identifier) == self.identifier ) {
                uint16_t    sequenceNumber;
                
                sequenceNumber = OSSwapBigToHostInt16(icmpPtr->sequenceNumber);
                if ([self validateSequenceNumber:sequenceNumber]) {
                    *sequenceNumberPtr = sequenceNumber;
                    result = YES;
                }
            }
        }
    }
    return result;
}

/*! Checks whether an incoming packet looks like a ping response.
 *  \param packet The packet, as returned to us by the kernel; note that may end up modifying 
 *      this data.
 *  \param sequenceNumberPtr A pointer to a place to start the ICMP sequence number.
 *  \returns YES if the packet looks like a reasonable IPv4 ping response.
 */

- (BOOL)validatePingResponsePacket:(NSMutableData *)packet sequenceNumber:(uint16_t *)sequenceNumberPtr {
    BOOL        result;
    
    switch (self.hostAddressFamily) {
        case AF_INET: {
            result = [self validatePing4ResponsePacket:packet sequenceNumber:sequenceNumberPtr];
        } break;
        case AF_INET6: {
            result = [self validatePing6ResponsePacket:packet sequenceNumber:sequenceNumberPtr];
        } break;
        default: {
            assert(NO);
            result = NO;
        } break;
    }
    return result;
}

/*! Reads data from the ICMP socket.
 *  \details Called by the socket handling code (SocketReadCallback) to process an ICMP 
 *      message waiting on the socket.
 */

- (void)readData {
    int                     err;
    struct sockaddr_storage addr;
    socklen_t               addrLen;
    ssize_t                 bytesRead;
    void *                  buffer;
    enum { kBufferSize = 65535 };

    // 65535 is the maximum IP packet size, which seems like a reasonable bound 
    // here (plus it's what <x-man-page://8/ping> uses).
    
    buffer = malloc(kBufferSize);
    assert(buffer != NULL);
    
    // Actually read the data.  We use recvfrom(), and thus get back the source address, 
    // but we don't actually do anything with it.  It would be trivial to pass it to 
    // the delegate but we don't need it in this example.
    
    addrLen = sizeof(addr);
    bytesRead = recvfrom(CFSocketGetNative(self.socket), buffer, kBufferSize, 0, (struct sockaddr *) &addr, &addrLen);
    err = 0;
    if (bytesRead < 0) {
        err = errno;
    }
    
    // Process the data we read.
    
    if (bytesRead > 0) {
        NSMutableData *         packet;
        id<SimplePingDelegate>  strongDelegate;
        uint16_t                sequenceNumber;

        packet = [NSMutableData dataWithBytes:buffer length:(NSUInteger) bytesRead];
        assert(packet != nil);

        // We got some data, pass it up to our client.

        strongDelegate = self.delegate;
        if ( [self validatePingResponsePacket:packet sequenceNumber:&sequenceNumber] ) {
            if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didReceivePingResponsePacket:sequenceNumber:)] ) {
                [strongDelegate simplePing:self didReceivePingResponsePacket:packet sequenceNumber:sequenceNumber];
            }
        } else {
            if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didReceiveUnexpectedPacket:)] ) {
                [strongDelegate simplePing:self didReceiveUnexpectedPacket:packet];
            }
        }
    } else {
    
        // We failed to read the data, so shut everything down.
        
        if (err == 0) {
            err = EPIPE;
        }
        [self didFailWithError:[NSError errorWithDomain:NSPOSIXErrorDomain code:err userInfo:nil]];
    }
    
    free(buffer);
    
    // Note that we don't loop back trying to read more data.  Rather, we just 
    // let CFSocket call us again.
}

/*! The callback for our CFSocket object.
 *  \details This simply routes the call to our `-readData` method.
 *  \param s See the documentation for CFSocketCallBack.
 *  \param type See the documentation for CFSocketCallBack.
 *  \param address See the documentation for CFSocketCallBack.
 *  \param data See the documentation for CFSocketCallBack.
 *  \param info See the documentation for CFSocketCallBack; this is actually a pointer to the 
 *      'owning' object.
 */

static void SocketReadCallback(CFSocketRef s, CFSocketCallBackType type, CFDataRef address, const void *data, void *info) {
    // This C routine is called by CFSocket when there's data waiting on our 
    // ICMP socket.  It just redirects the call to Objective-C code.
    SimplePing *    obj;
    
    obj = (__bridge SimplePing *) info;
    assert([obj isKindOfClass:[SimplePing class]]);
    
    #pragma unused(s)
    assert(s == obj.socket);
    #pragma unused(type)
    assert(type == kCFSocketReadCallBack);
    #pragma unused(address)
    assert(address == nil);
    #pragma unused(data)
    assert(data == nil);
    
    [obj readData];
}

/*! Starts the send and receive infrastructure.
 *  \details This is called once we've successfully resolved `hostName` in to 
 *      `hostAddress`.  It's responsible for setting up the socket for sending and 
 *      receiving pings.
 */

- (void)startWithHostAddress {
    int                     err;
    int                     fd;

    assert(self.hostAddress != nil);

    // Open the socket.
    
    fd = -1;
    err = 0;
    switch (self.hostAddressFamily) {
        case AF_INET: {
            fd = socket(AF_INET, SOCK_DGRAM, IPPROTO_ICMP);
            if (fd < 0) {
                err = errno;
            }
        } break;
        case AF_INET6: {
            fd = socket(AF_INET6, SOCK_DGRAM, IPPROTO_ICMPV6);
            if (fd < 0) {
                err = errno;
            }
        } break;
        default: {
            err = EPROTONOSUPPORT;
        } break;
    }
    
    if (err != 0) {
        [self didFailWithError:[NSError errorWithDomain:NSPOSIXErrorDomain code:err userInfo:nil]];
    } else {
        CFSocketContext         context = {0, (__bridge void *)(self), NULL, NULL, NULL};
        CFRunLoopSourceRef      rls;
        id<SimplePingDelegate>  strongDelegate;
        
        // Wrap it in a CFSocket and schedule it on the runloop.
        
        self.socket = (CFSocketRef) CFAutorelease( CFSocketCreateWithNative(NULL, fd, kCFSocketReadCallBack, SocketReadCallback, &context) );
        assert(self.socket != NULL);
        
        // The socket will now take care of cleaning up our file descriptor.
        
        assert( CFSocketGetSocketFlags(self.socket) & kCFSocketCloseOnInvalidate );
        fd = -1;
        
        rls = CFSocketCreateRunLoopSource(NULL, self.socket, 0);
        assert(rls != NULL);
        
        CFRunLoopAddSource(CFRunLoopGetCurrent(), rls, kCFRunLoopDefaultMode);
        
        CFRelease(rls);

        strongDelegate = self.delegate;
        if ( (strongDelegate != nil) && [strongDelegate respondsToSelector:@selector(simplePing:didStartWithAddress:)] ) {
            [strongDelegate simplePing:self didStartWithAddress:self.hostAddress];
        }
    }
    assert(fd == -1);
}

/*! Processes the results of our name-to-address resolution.
 *  \details Called by our CFHost resolution callback (HostResolveCallback) when host 
 *      resolution is complete.  We just latch the first appropriate address and kick 
 *      off the send and receive infrastructure.
 */

- (void)hostResolutionDone {
    Boolean     resolved;
    NSArray *   addresses;
    
    // Find the first appropriate address.
    
    addresses = (__bridge NSArray *) CFHostGetAddressing(self.host, &resolved);
    if ( resolved && (addresses != nil) ) {
        resolved = false;
        for (NSData * address in addresses) {
            const struct sockaddr * addrPtr;
            
            addrPtr = (const struct sockaddr *) address.bytes;
            if ( address.length >= sizeof(struct sockaddr) ) {
                char *s = NULL;
                switch (addrPtr->sa_family) {
                    case AF_INET: {
                        struct sockaddr_in *addr_in = (struct sockaddr_in *)addrPtr;
                        s = malloc(INET_ADDRSTRLEN);
                        inet_ntop(AF_INET, &(addr_in->sin_addr), s, INET_ADDRSTRLEN);
                        self.IPAddress = [NSString stringWithFormat:@"%s", s];
                        if (self.addressStyle != SimplePingAddressStyleICMPv6) {
                            self.hostAddress = address;
                            resolved = true;
                        }
                    } break;
                    case AF_INET6: {
                        struct sockaddr_in6 *addr_in6 = (struct sockaddr_in6 *)addrPtr;
                        s = malloc(INET6_ADDRSTRLEN);
                        inet_ntop(AF_INET6, &(addr_in6->sin6_addr), s, INET6_ADDRSTRLEN);
                        self.IPAddress = [NSString stringWithFormat:@"%s", s];
                        if (self.addressStyle != SimplePingAddressStyleICMPv4) {
                            self.hostAddress = address;
                            resolved = true;
                        }
                    } break;
                }
            }
            if (resolved) {
                break;
            }
        }
    }

    // We're done resolving, so shut that down.
    
    [self stopHostResolution];
    
    // If all is OK, start the send and receive infrastructure, otherwise stop.
    
    if (resolved) {
        [self startWithHostAddress];
    } else {
        [self didFailWithError:[NSError errorWithDomain:(NSString *)kCFErrorDomainCFNetwork code:kCFHostErrorHostNotFound userInfo:nil]];
    }
}

/*! The callback for our CFHost object.
 *  \details This simply routes the call to our `-hostResolutionDone` or 
 *      `-didFailWithHostStreamError:` methods.
 *  \param theHost See the documentation for CFHostClientCallBack.
 *  \param typeInfo See the documentation for CFHostClientCallBack.
 *  \param error See the documentation for CFHostClientCallBack.
 *  \param info See the documentation for CFHostClientCallBack; this is actually a pointer to 
 *      the 'owning' object.
 */

static void HostResolveCallback(CFHostRef theHost, CFHostInfoType typeInfo, const CFStreamError *error, void *info) {
    // This C routine is called by CFHost when the host resolution is complete. 
    // It just redirects the call to the appropriate Objective-C method.
    SimplePing *    obj;

    obj = (__bridge SimplePing *) info;
    assert([obj isKindOfClass:[SimplePing class]]);
    
    #pragma unused(theHost)
    assert(theHost == obj.host);
    #pragma unused(typeInfo)
    assert(typeInfo == kCFHostAddresses);
    
    if ( (error != NULL) && (error->domain != 0) ) {
        [obj didFailWithHostStreamError:*error];
    } else {
        [obj hostResolutionDone];
    }
}

- (void)start {
    Boolean             success;
    CFHostClientContext context = {0, (__bridge void *)(self), NULL, NULL, NULL};
    CFStreamError       streamError;
    
    assert(self.host == NULL);
    assert(self.hostAddress == nil);

    self.host = (CFHostRef) CFAutorelease( CFHostCreateWithName(NULL, (__bridge CFStringRef) self.hostName) );
    assert(self.host != NULL);
    
    CFHostSetClient(self.host, HostResolveCallback, &context);
    
    CFHostScheduleWithRunLoop(self.host, CFRunLoopGetCurrent(), kCFRunLoopDefaultMode);
    
    success = CFHostStartInfoResolution(self.host, kCFHostAddresses, &streamError);
    if ( ! success ) {
        [self didFailWithHostStreamError:streamError];
    }
}

/*! Stops the name-to-address resolution infrastructure.
 */

- (void)stopHostResolution {
    // Shut down the CFHost.
    if (self.host != NULL) {
        CFHostSetClient(self.host, NULL, NULL);
        CFHostUnscheduleFromRunLoop(self.host, CFRunLoopGetCurrent(), kCFRunLoopDefaultMode);
        self.host = NULL;
    }
}

/*! Stops the send and receive infrastructure.
 */

- (void)stopSocket {
    if (self.socket != NULL) {
        CFSocketInvalidate(self.socket);
        self.socket = NULL;
    }
}

- (void)stop {
    [self stopHostResolution];
    [self stopSocket];
    
    // Junk the host address on stop.  If the client calls -start again, we'll 
    // re-resolve the host name.
    self.IPAddress = nil;
    self.hostAddress = NULL;
}

@end
```

## MZPingServices.h
```js
#import <Foundation/Foundation.h>

typedef NS_ENUM(NSInteger, CYPPingStatus) {
    CYPPingStatusDidStart,
    CYPPingStatusDidFailToSendPacket,
    CYPPingStatusDidReceivePacket,
    CYPPingStatusDidReceiveUnexpectedPacket,
    CYPPingStatusDidTimeout,
    CYPPingStatusError,
    CYPPingStatusFinished,
};

@interface CYPPingItem : NSObject

@property(nonatomic, copy) NSString *originalAddress; // ping的域名
@property(nonatomic, copy) NSString *IPAddress; // 客户端请求ip

@property(nonatomic, assign) NSUInteger dateBytesLength; // 数据长度
@property(nonatomic, assign) double timeMilliseconds;
@property(nonatomic, assign) NSInteger timeToLive;
@property(nonatomic, assign) NSInteger ICMPSequence; // icmp
@property(nonatomic, strong) NSDate *sendDate; // 发送数据时间
@property(nonatomic, strong) NSDate *receivedDate; // 接受数据时间
@property(nonatomic) CYPPingStatus status; // 请求状态

// 分析统计结果
+ (NSString *)statisticsWithPingItems:(NSArray *)pingItems;

@end


@interface CYPPingServices : NSObject

/// 超时时间, default 500ms
@property(nonatomic) double timeoutMilliseconds;

/// 最大ping次数
@property(nonatomic) NSInteger  maximumPingTimes;


+ (CYPPingServices *)startPingAddress:(NSString *)address
                      callbackHandler:(void(^)(CYPPingItem *pingItem, NSArray *pingItems))handler;

@end
```
## MZPingServices.m
```js
#import "CYPPingServices.h"
#import "SimplePing.h"

@implementation CYPPingItem

#pragma mark - 分析结果
+ (NSString *)statisticsWithPingItems:(NSArray *)pingItems {
    //    --- ping statistics ---
    //    5 packets transmitted, 5 packets received, 0.0% packet loss
    //    round-trip min/avg/max/stddev = 4.445/9.496/12.210/2.832 ms
    NSString *address = [pingItems.firstObject originalAddress];
    __block NSInteger receivedCount = 0, allCount = 0;
    __block CGFloat delTime = 0.0;
    [pingItems enumerateObjectsUsingBlock:^(CYPPingItem *obj, NSUInteger idx, BOOL *stop) {
        if (obj.status != CYPPingStatusFinished && obj.status != CYPPingStatusError) {
            allCount ++;
            if (obj.status == CYPPingStatusDidReceivePacket) {
                delTime += [obj.receivedDate timeIntervalSinceDate:obj.sendDate] * 1000;
                receivedCount ++;
            }
        }
    }];
    
    NSMutableString *description = [NSMutableString stringWithCapacity:50];
    [description appendFormat:@"--- %@ ping statistics ---\n", address];
    
    CGFloat lossPercent = (CGFloat)(allCount - receivedCount) / MAX(1.0, allCount) * 100;
    [description appendFormat:@"%ld packets transmitted, %ld packets received, %.1f%% packet, loss deltime %.3fms \n", (long)allCount, (long)receivedCount, lossPercent, delTime/allCount];
    return [description stringByReplacingOccurrencesOfString:@".0%" withString:@"%"];
}

#pragma mark - 生成对应状态描述
- (NSString *)description {
    switch (self.status) {
        case CYPPingStatusDidStart:
            return [NSString stringWithFormat:@"PING %@ (%@): %ld data bytes",self.originalAddress, self.IPAddress, (long)self.dateBytesLength];
        case CYPPingStatusDidReceivePacket:
            return [NSString stringWithFormat:@"%ld bytes from %@: icmp_seq=%ld ttl=%ld time=%.3fms deltime=%.3fms", (long)self.dateBytesLength, self.IPAddress, (long)self.ICMPSequence, (long)self.timeToLive, self.timeMilliseconds,     [self.receivedDate timeIntervalSinceDate:self.sendDate] * 1000];
        case CYPPingStatusDidTimeout:
            return [NSString stringWithFormat:@"Request timeout for icmp_seq %ld", (long)self.ICMPSequence];
        case CYPPingStatusDidFailToSendPacket:
            return [NSString stringWithFormat:@"Fail to send packet to %@: icmp_seq=%ld", self.IPAddress, (long)self.ICMPSequence];
        case CYPPingStatusDidReceiveUnexpectedPacket:
            return [NSString stringWithFormat:@"Receive unexpected packet from %@: icmp_seq=%ld", self.IPAddress, (long)self.ICMPSequence];
        case CYPPingStatusError:
            return [NSString stringWithFormat:@"Can not ping to %@", self.originalAddress];
        default:
            break;
    }
    return super.description;
}


@end

@interface CYPPingServices()<SimplePingDelegate> {
    NSMutableArray *_pingItems; // ping处理记录
    NSInteger   _repingTimes; // 重新请求次数
    BOOL _hasStarted; // 是否已经开始
    NSInteger _sequenceNumber;
    NSDate *_packetSendDate; // 开始发包时间
}
@property(nonatomic, copy) NSString *address; // ping的地址
@property(nonatomic, strong) SimplePing *simplePing;
@property(nonatomic, copy) void(^callbackHandler)(CYPPingItem *item, NSArray *pingItems); // cb

@end

@implementation CYPPingServices

+ (CYPPingServices *)startPingAddress:(NSString *)address
                      callbackHandler:(void(^)(CYPPingItem *pingItem, NSArray *pingItems))handler {
    CYPPingServices *services = [[CYPPingServices alloc] initWithAddress:address];
    services.callbackHandler = handler;
    [services startPing];
    return services;
}

- (instancetype)initWithAddress:(NSString *)address {
    self = [super init];
    if (self) {
        self.timeoutMilliseconds = 500;
        self.maximumPingTimes = 100;
        self.address = address;
        self.simplePing = [[SimplePing alloc] initWithHostName:address];
        self.simplePing.addressStyle = SimplePingAddressStyleAny;
        self.simplePing.delegate = self;
        _pingItems = [NSMutableArray arrayWithCapacity: 10];
    }
    return self;
}

- (void)startPing {
    _repingTimes = 0;
    _hasStarted = NO;
    [_pingItems removeAllObjects];
    [self.simplePing start];
}

#pragma mark - 重新请求
- (void)reping {
    [self.simplePing stop];
    [self.simplePing start];
}

- (void)_timeoutActionFired {
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.ICMPSequence = _sequenceNumber;
    pingItem.originalAddress = self.address;
    pingItem.status = CYPPingStatusDidTimeout;
    pingItem.sendDate = _packetSendDate;
    pingItem.receivedDate = [NSDate date];
    [self.simplePing stop];
    [self _handlePingItem:pingItem];
}

- (void)_handlePingItem:(CYPPingItem *)pingItem {
    if (pingItem.status == CYPPingStatusDidReceivePacket || pingItem.status == CYPPingStatusDidTimeout) {
        [_pingItems addObject:pingItem];
    }
    if (_repingTimes < self.maximumPingTimes - 1) {
        if (self.callbackHandler) {
            self.callbackHandler(pingItem, [_pingItems copy]);
        }
        _repingTimes ++;
        NSTimer *timer = [NSTimer timerWithTimeInterval:1.0 target:self selector:@selector(reping) userInfo:nil repeats:NO];
        [[NSRunLoop currentRunLoop] addTimer:timer forMode:NSRunLoopCommonModes];
    } else {
        if (self.callbackHandler) {
            self.callbackHandler(pingItem, [_pingItems copy]);
        }
        [self cancel];
    }
}

- (void)cancel {
    [[self class] cancelPreviousPerformRequestsWithTarget:self selector:@selector(_timeoutActionFired) object:nil];
    [self.simplePing stop];
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.status = CYPPingStatusFinished;
    [_pingItems addObject:pingItem];
    if (self.callbackHandler) {
        self.callbackHandler(pingItem, [_pingItems copy]);
    }
}


- (void)simplePing:(SimplePing *)pinger didStartWithAddress:(NSData *)address {
    _packetSendDate = [NSDate date];
    if (!_hasStarted) {
        CYPPingItem *pingItem = [[CYPPingItem alloc] init];
        pingItem.IPAddress = pinger.IPAddress;
        pingItem.originalAddress = self.address;
        pingItem.status = CYPPingStatusDidStart;
        if (self.callbackHandler) {
            self.callbackHandler(pingItem, nil);
        }
        _hasStarted = YES;
    }
    [pinger sendPingWithData:nil];
    [self performSelector:@selector(_timeoutActionFired) withObject:nil afterDelay:self.timeoutMilliseconds / 1000.0];
}

- (void)simplePing:(SimplePing *)pinger didSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber {
    _sequenceNumber = sequenceNumber;
}

#pragma mark - 发送包失败
- (void)simplePing:(SimplePing *)pinger didFailToSendPacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber error:(NSError *)error {
    [[self class] cancelPreviousPerformRequestsWithTarget:self selector:@selector(_timeoutActionFired) object:nil];
    // _sequenceNumber = sequenceNumber;
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.ICMPSequence = sequenceNumber;
    pingItem.originalAddress = self.address;
    pingItem.status = CYPPingStatusDidFailToSendPacket;
    [self _handlePingItem:pingItem];
}

#pragma mark - 收到异常包数据
- (void)simplePing:(SimplePing *)pinger didReceiveUnexpectedPacket:(NSData *)packet {
    [[self class] cancelPreviousPerformRequestsWithTarget:self selector:@selector(_timeoutActionFired) object:nil];
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.ICMPSequence = _sequenceNumber;
    pingItem.originalAddress = self.address;
    pingItem.dateBytesLength = packet.length;
    pingItem.status = CYPPingStatusDidReceiveUnexpectedPacket;
    [self _handlePingItem:pingItem];
}

#pragma mark - 收到包数据
- (void)simplePing:(SimplePing *)pinger didReceivePingResponsePacket:(NSData *)packet sequenceNumber:(uint16_t)sequenceNumber {
    [[self class] cancelPreviousPerformRequestsWithTarget:self selector:@selector(_timeoutActionFired) object:nil];
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.IPAddress = pinger.IPAddress;
    pingItem.dateBytesLength = packet.length;
    pingItem.sendDate = _packetSendDate;
    pingItem.receivedDate = [NSDate date];
    // pingItem.timeToLive = timeToLive;
    // pingItem.timeMilliseconds = timeElapsed * 1000;
    pingItem.ICMPSequence = sequenceNumber;
    pingItem.originalAddress = self.address;
    pingItem.status = CYPPingStatusDidReceivePacket;
    [self _handlePingItem:pingItem];
}

#pragma mark - 连接|发送失败
- (void)simplePing:(SimplePing *)pinger didFailWithError:(NSError *)error {
    [[self class] cancelPreviousPerformRequestsWithTarget:self selector:@selector(_timeoutActionFired) object:nil];
    [self.simplePing stop];
      
//    CYPPingItem *errorPingItem = [[CYPPingItem alloc] init];
//    errorPingItem.originalAddress = self.address;
//    errorPingItem.status = CYPPingStatusError;
//    if (self.callbackHandler) {
//        self.callbackHandler(errorPingItem, [_pingItems copy]);
//    }
      
    CYPPingItem *pingItem = [[CYPPingItem alloc] init];
    pingItem.originalAddress = self.address;
    pingItem.IPAddress = pinger.IPAddress ?: pinger.hostName;
    pingItem.status = CYPPingStatusError;
    [_pingItems addObject:pingItem];
    if (self.callbackHandler) {
        self.callbackHandler(pingItem, [_pingItems copy]);
    }
}

@end
```

## 使用
```js
self.pingServices = [MZPingServices startPingAddress:@"auction.test.cheyipai.com" callbackHandler:^(MZPingItem *pingItem, NSArray *pingItems) {
    if (pingItem.status != MZPingStatusFinished) {
        NSLog(@"111====%@", pingItem.description);            // [weakSelf.textView appendText:pingItem.description];
    } else {
        NSString *result = [MZPingItem statisticsWithPingItems:pingItems];
            NSLog(@"222====%@", result);
//      [weakSelf.textView appendText:[STDPingItem statisticsWithPingItems:pingItems]];
//      [button setTitle:@"Ping" forState:UIControlStateNormal];
//      button.tag = 10001;
        self.pingServices = nil;
    }
}];
//  self.pingServices.timeoutMilliseconds = 10;
self.pingServices.maximumPingTimes = 20;
```
